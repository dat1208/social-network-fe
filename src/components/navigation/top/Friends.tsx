import { Fingerprint } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import React, { useEffect, useState } from 'react'
import getF from '../../../services/api/User/getFriends';
import { Response_GetFriends, FriendsItf,PagingItemFriend } from '../../../interface/interfaces';
import InBox from '../../chat/InBox';
import getuid from '../../../services/api/User/getuid';

function Friends (){

    const  [ownId, setOwnId] = React.useState("");
    React.useEffect(() => {
        const fetchData = async () => {
        
        const ownUidFromToken = await getuid();
            if(ownUidFromToken)
            setOwnId(ownUidFromToken);
        
    }
        fetchData();
      }, []);

      

    const [dataFriends,setDataFriends] = React.useState({
        dataFriends: Array<PagingItemFriend>()
    })

    const [isShowChat, setIsShowChat] = React.useState(false);
    React.useEffect(() =>{

        async function getFriend(){
           
            const data = await getF.getFriends(0,3) as unknown as FriendsItf;
            
            if(data)
            setDataFriends({dataFriends: data.Paging});
            console.log(dataFriends.dataFriends);
            
        }

        getFriend();
            
       },[]);


       function checkFriends(){
        if(dataFriends.dataFriends.length === 0 )
            return false;
        else return true;

       }

       function handleChatClick(){
            setIsShowChat(!isShowChat);
       }
    return(
                                <div>
                                    <h4 className='left-sidebar-title fw-bold'>Friends</h4>
                                     {checkFriends() ? <>

                                        {dataFriends.dataFriends.map(friend => (
                                        <div style={{marginBottom:30}} className='row row-left-sidebar-post'>
                                        <div className="col-3 left-sidebar-post">
                                            <Avatar style={{width:'100%',height:'auto'}} src={friend.Avatar} ></Avatar>
                                        </div>
                                        <div className="col-5 left-sidebar-post">
                                            <div className="row left-sidebar-post-content">
                                                <a href={'/profile/'+friend.Id} className='p-0' style={{fontSize:'100%'}} >{friend.DisplayName}</a>
                                            </div>
                                        </div>
                                        <div style={{width:'fit-content'}} className='col-sm-auto p-0'>
                                            <IconButton onClick={handleChatClick} aria-label="ChatBubble" color="inherit">
                                            <ChatBubbleIcon style={{width:25,height:'auto'}} />
                                            </IconButton>
                                            {isShowChat ? <InBox ownIdUser={ownId} isShow={isShowChat} friendId={friend.Id} friendAvatarUrl={friend.Avatar} friendName={friend.DisplayName}></InBox> :<></> }
                                            
                                        </div>
                                       
                                    </div>
                                    )) }  

                                     </> : <><p>Empty Friend</p></>}    
                                </div>
    )
}


export default Friends