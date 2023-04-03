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
  ownIdUser:string
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
  friendName,
  ownIdUser
}) => {

  const [messages, setMessages] =
    React.useState({ data: Array<IMessage>() });

  const [ownId, setOwnId] = React.useState(ownIdUser);
  const [roomId, setRoomID] = React.useState('');
  const [isShowChat, SetIsShowChat] = React.useState(isShow);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ownUidFromToken = await getuid();
        
        if (ownUidFromToken) { setOwnId(ownUidFromToken); 
        console.log("OwnId "+ownId)
        }

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

              const temp = doc.data() as unknown as Message;

              const messageToDisplay =
                convertRecieveMessageToIMessage(temp, ownId);

              messagesTemp.push(messageToDisplay);
            });

            setMessages({ data: [...messagesTemp].reverse() });
            console.log(messagesTemp); 
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const convertRecieveMessageToIMessage = (message: Message, userID: string): IMessage => {
    console.log("message");
    console.log(message);
    console.log("userID: "+userID);
    const inputMessage: IMessage = {
      avatar: friendAvatarUrl,
      isMe: message.userID === ownId ? true : false,
      message: message.text,
      time: "",
      id: message.id
    };
    console.log(inputMessage);
    return inputMessage;
  }

 


  return (
    <>
      <main style={{ maxWidth: '45%' }} className='chat-box border rounded'>
      <MessageComponent
        messages={messages.data}
        senderName={friendName}
        senderAvatar={friendAvatarUrl}
        onClose={function (): void {
          
        }}
        roomId={roomId}
        friendId={friendId}
        userId={ownId} />
    </main>
     
    </>
    
    
  );
}

export default InBox
