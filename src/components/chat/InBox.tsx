import React from 'react';
import getuid from '../../services/api/User/getuid';
import getRoom from '../../services/api/User/getRoom';
import { collection, doc, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebase/init';
import MessageComponent, { IMessage } from './MessageComponent';

interface Props {
  isShow: boolean,
  friendId: string,
  friendAvatarUrl: string,
  friendName: string,
}

export interface Message {
  id: string,
  userID: string,
  createdTime: string,
  text: string
}
const InBox: React.FC<Props> = ({
  isShow,
  friendId,
  friendAvatarUrl,
  friendName
}) => {

  const [messages, setMessages] =
    React.useState({ data: Array<IMessage>() });

  const [ownId, setOwnId] = React.useState('642484213762b8ff8462d781');
  const [roomId, setRoomID] = React.useState('f1892fe3-e2af-49b4-be6b-4d6de6729fce');


  const convertRecieveMessageToIMessage = (message: Message, userID: string): IMessage => {
    const inputMessage: IMessage = {
      avatar: friendAvatarUrl,
      isMe: message.userID == userID ? true : false,
      message: message.text,
      time: '',
      id: message.id
    };
    return inputMessage;
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ownUidFromToken = await getuid() as unknown as string;
        
        if (ownUidFromToken) { setOwnId(ownUidFromToken); }

        const roomId = await getRoom(friendId, ownId);

        if (!roomId) {
          throw new Error('Room ID not found');
        }

        setRoomID(roomId);

        const chatCollectionName = 'messages';
        const chatDocumentChild = 'chat';

        const parentDocRef = doc(
          db,
          chatCollectionName,
          roomId);

        const chatCollectionReferenced = collection(parentDocRef, chatDocumentChild);
        const orderByCreatedDate = orderBy('createdTime', 'desc');

        const queryDocument = query(
          chatCollectionReferenced,
          orderByCreatedDate,
          limit(15));

        onSnapshot(
          queryDocument,
          async (querySnapshot) => {

            const messagesTemp: IMessage[] = [];

            querySnapshot.forEach((doc) => {

              const temp = doc.data() as Message;

              const messageToDisplay =
                convertRecieveMessageToIMessage(temp, ownId);

              messagesTemp.push(messageToDisplay);
            });

            setMessages({ data: [...messagesTemp].reverse() });
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <main style={{ maxWidth: '45%' }} className='chat-box border rounded'>
      <MessageComponent
        messages={messages.data}
        senderName={friendName}
        senderAvatar={friendAvatarUrl}
        onClose={function (): void {
          console.log('Close Message');
          throw new Error('Function not implemented.');
        }}
        roomId={roomId}
        friendId={''}
        userId={friendId} />
    </main>
  );
}

export default InBox
