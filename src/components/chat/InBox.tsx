import React from 'react';
import getuid from '../../services/api/User/getuid';
import getRoom from '../../services/api/User/getRoom';
import { collection, doc, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebase/init';
import MessageComponent, { IMessage } from './MessageComponent';
import { IconButton } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

interface Props {
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
  friendId,
  friendAvatarUrl,
  friendName,
  ownIdUser
}) => {

  const [messages, setMessages] =
  React.useState({ data: Array<IMessage>() });
  const [isShowChat, setIsShowChat] = React.useState(false);
  const [ownId, setOwnId] = React.useState(ownIdUser);
  const [roomId, setRoomID] = React.useState('');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ownUidFromToken = await getuid();
        
        if (ownUidFromToken) { setOwnId(ownUidFromToken); 
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
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const convertRecieveMessageToIMessage = (message: Message, userID: string): IMessage => {
    console.log(userID);
    const inputMessage: IMessage = {
      avatar: friendAvatarUrl,
      isMe: message.userID === userID ? true : false,
      message: message.text,
      time: "",
      id: message.id
    };
    return inputMessage;
  }

  function handleChatClick(){
    setIsShowChat(!isShowChat);
}


  return (
    <>
      <main style={{ maxWidth: '45%' }} className='chat-box'>

      <IconButton onClick={handleChatClick} aria-label="ChatBubble" color="inherit">
      <ChatBubbleIcon style={{width:25,height:'auto'}} />
      </IconButton>
      {isShowChat ?
      <MessageComponent
      messages={messages.data}
      senderName={friendName}
      senderAvatar={friendAvatarUrl}
      onClose={function (): void {
        setIsShowChat(false);
      }}
      roomId={roomId}
      friendId={friendId}
      userId={ownId} /> 
      : <></>  
    }
      
    </main>
     
    </>
    
    
  );
}

export default InBox
