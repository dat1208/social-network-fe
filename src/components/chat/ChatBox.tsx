import { Firestore, addDoc, setDoc, getDoc, getDocs, documentId, query, where, collection, serverTimestamp, doc, orderBy, limit } from "firebase/firestore";
import { db } from "../../services/firebase/init";
import React from 'react';
import { Box, TextField } from '@mui/material';
import { Button } from 'semantic-ui-react';
import getuid from "../../services/api/User/getuid";
import getRoom from "../../services/api/User/getRoom";
interface Props {
    userIDto: string,
    //userDisplayName :string,
    //userAvatar :string
}



const Chat: React.FC<Props> = ({ userIDto }) => {
    const [message, setMessage] = React.useState("");
    const [userIDTo, setUserIDTo] = React.useState(userIDto);
    const [userOwnID, setUserOwnID] = React.useState("");
    const [roomID, setRoomID] = React.useState("");
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const OwnUID = await getuid() as unknown as string;
            setUserOwnID(OwnUID)

            const roomID = await getRoom(userIDTo, OwnUID);
            if (roomID)
                setRoomID(roomID);

            console.log("UIDOwn: " + OwnUID);
            console.log("UIDTo: " + userIDTo);
            console.log("RoomID: " + roomID);
        }
        fetchData()
    }, [])

    async function handleCLick() {
        setData({
            userID: userOwnID,
            text: message,
            createdTime: serverTimestamp()
        })
        const roomRef = doc(db, "messages", roomID);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
            addDoc(collection(roomRef, "chat"), data);
        }
        else {
            const collectionRef = collection(db, "messages", roomID, "chat");
            addDoc(collectionRef, {
                userID: userOwnID,
                text: message,
                createdTime: serverTimestamp()
            });
        }
        console.log("Added");
    };

    return (
        <div style={{ height: 500 }} className='rounded border'>
            <Box border={"ActiveBorder"}>
                <TextField value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder='Messages...' ></TextField>
                <Button onClick={handleCLick} >Send</Button>
            </Box>
        </div>

    );
}

export default Chat;


