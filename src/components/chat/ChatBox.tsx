import { Firestore, addDoc,setDoc, getDoc,getDocs , documentId,query, where, collection, serverTimestamp, doc } from "firebase/firestore";
import {db} from "../../services/firebase/init";
import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { Button } from 'semantic-ui-react';
import { Response_GetId_User } from "../../interface/interfaces";
import getuid from "../../services/api/User/getuid";
import getRoom from "../../services/api/User/getRoom";
interface Props {
    userIDto :string,
    //userDisplayName :string,
    //userAvatar :string
}

const Chat : React.FC<Props> = ({userIDto}) => {
    const [message, setMessage] = React.useState("");
    const [userIDTo,setUserIDTo]  = React.useState(userIDto);
    const [userOwnID,setUserOwnID]  = React.useState("");
    const [roomID,setRoomID] = React.useState("");
    const [data,setData] = React.useState({
        
    });  

    async function getUserIDTo(){
        return getuid;
    }
    

    async function handleCLick(){

        

        const OwnUID = await getUserIDTo();
        if(OwnUID){
            await setUserOwnID(OwnUID); 
            
            const roomID = await getRoom(userIDTo,userOwnID);
            if(roomID)
               await setRoomID(roomID);
        }
        
        console.log("UID: "+OwnUID+" | "+userIDTo+ " | "+roomID);
        
        setData({
            userID:  OwnUID,
            text: message,
            createdTime: serverTimestamp()
        })
    

        const roomRef = await doc(db, "messages", roomID);

        const roomSnap = await getDoc(roomRef);

        if(roomSnap.exists()){

            addDoc(collection(roomRef,"chat"),data);   
        }
        else{
            const collectionRef = collection(db, "messages", roomID, "chat");
            addDoc(collectionRef, data);
        }
        console.log("Added");
        
    };
    return (
     <div style={{height:500}} className='rounded border'>
            <Box border={"ActiveBorder"}>
                <TextField value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='Messages...' ></TextField>
                <Button onClick={handleCLick} >Send</Button>
            </Box>
     </div>
        
    );
}

export default Chat;


   