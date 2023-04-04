import Button from '@mui/material/Button';
import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { IconButton } from '@mui/material';
import getUID from '../../services/api/User/getuid';
import addFriend from '../../services/api/User/addFriend';

interface props{
    listFriends:Array<string> 
    userId:string,
    ownIdUser:string
}

interface Paging{
    Id: string;
    Username: string;
    Email: string;
    DisplayName: string;
    AvatarUrl: string;
    UserProfileUrl: string;
}


export default function AddUnFriend (props: props){
    const [addSend, setAddSend] = React.useState(false);
    const [listF, setListF] = React.useState(props.listFriends);
    const [userOwnId, setUserOwnId] = React.useState(props.ownIdUser);
    const [userId, setUserId] = React.useState(props.userId);
    const handleClick = () => {
        
        // Do something with the event object
        
      };


      React.useEffect(() =>{
 
        async function getUserOwn(){
            const user = await getUID();
            if(user)
            {
                setUserOwnId(user);
            }
        }
        getUserOwn();

        async function getCheck(){
          const InvitesData = await addFriend.checkSendInvite(userId) as unknown as Array<Paging>;
          
          const user = await getUID();
          if(InvitesData)
          {
            InvitesData.forEach(element => {                 
                if(element.Id === user){
                   
                    setAddSend(true);
                }
            });
          }
        }
        
        getCheck();
       },[]);

       function checkUserIdInArray(arr: string[], userId: string): boolean {
        return arr.includes(userId);
      }


    async function handleClickAdd(){
        if(userId && userOwnId)
        await addFriend.addFriend(userId,userOwnId);
    }

    async function handleClickCancel(){
        if(userId && userOwnId)
        await addFriend.addFriend(userId,userOwnId);
    }

    async function handleClickUnfriend(){
        if(userId && userOwnId)
        await addFriend.unfriend(userId,userOwnId);
    }
      
    return (
        <>
        {checkUserIdInArray(listF,userOwnId) ? <Button onClick={handleClickUnfriend} color='inherit' variant='outlined'>Unfriend</Button> : 
        
            addSend ? 
            <IconButton color={"inherit"}  onClick={handleClickCancel} component="label">
            <PersonAddDisabledIcon />
            </IconButton> :
            <IconButton color={"inherit"}  onClick={handleClickAdd} component="label">
            <PersonAddIcon />
            </IconButton>
        }
        
        </>
    )
}

function addFreind() {
    throw new Error('Function not implemented.');
}
