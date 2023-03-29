import React from 'react';
import getuid from '../../services/api/User/getuid';
import getRoom from '../../services/api/User/getRoom';
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebase/init';
import { Message } from 'semantic-ui-react';
import Chat from './ChatBox';

interface Props {
    userIDto :string,
    //userDisplayName :string,
    //userAvatar :string
}
interface Message {
    userID :string,
    createdTime:Date,
    text:string
}

const InBox : React.FC<Props> = ({userIDto}) => {
    const [messages, setMessages] = React.useState({
        data: Array<Message>()
    });
    const [userIDTo,setUserIDTo]  = React.useState(userIDto);
    const [roomID,setRoomID] = React.useState("");
    const [data,setData] = React.useState({});  

    React.useEffect(() => {
        
        const fetchData = async () => {
            const OwnUID = await getuid() as unknown as string;         
            
            const roomID = await getRoom(userIDTo,OwnUID);
            if(roomID)
                setRoomID(roomID);
            
            console.log("UIDOwn: "+OwnUID);
            console.log("UIDTo: "+userIDTo);
            console.log("RoomID: "+roomID);

            const roomIDConvert = roomID as unknown as string;      

            const parentDocRef = doc(db, 'messages', roomIDConvert);
            const subCollectionRef = collection(parentDocRef, 'chat');
            
            
            const unsubscribe = onSnapshot(subCollectionRef, async (querySnapshot) => {
            let messages_Temp = Array<Message>();
            querySnapshot.forEach((doc) => {
                let temp =  doc.data() as unknown as Message;
                messages_Temp.push(temp);
            });
            console.log(messages_Temp);
            setMessages({data:messages_Temp})
            });
            
        }

        
        fetchData()

    }, [])
       
      
    return (
        <main style={{maxWidth:'50%'}} className="chat-box border rounded">
        <div className="messages-wrapper">
            {messages.data.map((message) => (
            <p className={`chat-bubble ${message.userID === userIDTo ? "text-center" : ""}`}>
                {message.text}
                </p>
            ))}
        </div>
        <Chat userIDto={userIDTo}></Chat>
        </main>
    )
}

export default InBox
