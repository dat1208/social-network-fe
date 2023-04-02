import React from 'react';
import './styles-profile.css';
import {useParams} from 'react-router-dom';
import Navbar from '../components/navigation/top/Navbar';
import { Avatar, Button, IconButton } from '@mui/material';
import { Notification } from '../components/notify/notify'; 
import Friends from '../components/navigation/top/Friends';
import CreatePost from '../components/input/CreatePost';
import PostSelfCmpn from '../components/post/PostSelfCmpn';
import UserEdit from '../components/input/UserEdit';
import getUserById from '../services/api/User/getUserById';
import getUID from '../services/api/User/getuid';
import { UserByUid } from '../interface/interfaces';
import AddUnFriend from '../components/user/AddUnFriend';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import UserServices from '../services/user/UserServices';
const Profile: React.FC = (): JSX.Element => {
    const { userID } = useParams<{userID: string}>();

    const[userOwnId,setUserOwnId] = React.useState("");

    /* useState */
    const [userDisplay, setUserDisplay] = React.useState({
        "Id": "",
        "AvatarURL": "",
        "DisplayName": "",
        "UserProfileUrl": ""
    });


    const [userFetch,setUserFetch] = React.useState(
        {
            data: {
                Id: "",
                Username: "",
                Email: "",
                DisplayName: "",
                AvatarUrl: "",
                UserProfileUrl: "",
                NumberOfFriend: 0,
                ListFriendsObjectId: [] as Array<string>,
                ListPostsObjectId: [] as Array<string>,
                ListObjectId_UserSendInvite: [] as Array<string>,
                ListObjectId_GiveUserInvitation: [] as Array<string>,
                CreatedAt: new Date(),
            }
        }
    );
    
    /* useState */

    function formatDate(dateString: string): string {
        const date = new Date(Date.parse(dateString));
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${monthNames[monthIndex]} ${year}`;
      }
      
      
      

    React.useEffect(() =>{

        async function getUserDisplay(){
           
            if(userID){
                const userInfo = await getUserById(userID) as unknown as UserByUid;
                setUserFetch({data: userInfo});
                
            }
            console.log(userFetch.data);

            const ownId = await getUID();
            if(ownId)
                setUserOwnId(ownId);
                
            
        }

        const getUser = () => {
            if( typeof(UserServices.getUserDisplay()) != undefined || null )
        {
            const user = JSON.parse(UserServices.getUserDisplay() || '{}');
            setUserDisplay(user);
            
        }
        };
        getUser();

        getUserDisplay();
            
       },[]);
     
       function checkMatchUserId(userId:string){
        if(userId !== userOwnId)
            return false;
        else if(userId === userOwnId) 
            return true;
       }

       function checkStatusAddfriend(listFriendId:string[]){
        listFriendId.forEach(fID => {
            if(fID === userOwnId)
            return true;
        });
        return false;
       }
    return ( 
        
        <div>
            <Navbar></Navbar>
            <div className="Main row w-100 h-100 margin-0">
                
                <div className="col-md-10 p-0">
                    <div className="row bg-white user_info w-100 margin-0">
                        <div className='user-info-main '>
                            <div className="avatar d-flex justify-content-center w-100">
                                <Avatar className='border border-white border-2' alt={userFetch.data.DisplayName} style={{width:'170px',height:'auto'}} src={userFetch.data.AvatarUrl}></Avatar>
                            </div>
                            <div className="name">
                                
                                <h3 style={{color:'#393E41'}} className='fw-bolder'>{userFetch.data.DisplayName}</h3>
                            </div>
                            <div className="tag">
                                <p>@{userFetch.data.Username} • Joined {formatDate(userFetch.data.CreatedAt.toString())} </p>
                            </div>
                        </div>
                        <div className="banner w-100 p-0"></div>
                        <div className="row bottom w-100">
                            <div className="col-sm text-left align-self-end">
                                <p className='align-self-end' ><span className='fw-bold'>{userFetch.data.ListFriendsObjectId.length}</span> friends <span style={{marginLeft:'3%'}} className='fw-bold'>{userFetch.data.ListPostsObjectId.length}</span> posts</p>                                
                            </div>
                            <div className="col-sm bootom-right d-flex justify-content-end align-self-end">
                            
                            {checkMatchUserId(userFetch.data.Id) ? <UserEdit userId={userFetch.data.Id} displayName={userFetch.data.DisplayName} emailAddress={userFetch.data.Email} username={userFetch.data.Username} urlAvatar={userFetch.data.AvatarUrl}></UserEdit> : 
                            <>
                                <div style={{marginRight:'1%'}}>
                                <AddUnFriend status={checkStatusAddfriend(userFetch.data.ListFriendsObjectId)} userId={userFetch.data.Id} ></AddUnFriend>
                                </div>
                               <div>
                               <IconButton color="inherit" component="label">
                                <ChatBubbleIcon />
                                </IconButton>
                               </div>
                                
                            </>}
                                
                            </div>
                        </div>
                    </div>
                    <div className='w-100 dashboard-bar  row margin-0'>
                        <a>Timeline</a>
                    </div>
                    <div className='w-100 row margin-0'>
                        <div style={{marginRight:'1%'}} className="col-md p-0">
                            <div className="friends border bg-white p-3 rounded">
                                <Friends></Friends>
                            </div>
                        </div>
                        <div className="col-md-9 p-0">
                        {checkMatchUserId(userFetch.data.Id) ?  <div className="row border m-0 rounded bg-white create-post w-100">  
                            <CreatePost urlProfile={userDisplay.UserProfileUrl} name={userDisplay.DisplayName} urlAvatar={userFetch.data.AvatarUrl}></CreatePost>
                            </div>
                            : <></>}
                           
                            <div className="row m-0 w-100">
                               <PostSelfCmpn userId={(userID) ? userID : userOwnId}></PostSelfCmpn>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md  p-0 right-col">
                    <div className='border p-3 bg-white rounded'>
                        <Notification></Notification>
                    </div>
                </div>
                
            </div>
        </div>
    )
    
   
    
  }


export default Profile;