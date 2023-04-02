import { Fingerprint } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from 'react-bootstrap';
import getF from '../../../services/api/User/getFriends';
import { Response_GetFriends, FriendsItf,PagingItemFriend } from '../../../interface/interfaces';

function Friends (){

    const [dataFriends,setDataFriends] = React.useState({
        dataFriends: Array<PagingItemFriend>()
    })

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
                                        <div style={{width:'fit-content'}} className='col-3 p-0'>
                                            <IconButton aria-label="ChatBubble" color="inherit">
                                            <ChatBubbleIcon style={{width:20,height:'auto'}} />
                                            </IconButton>
                                            <IconButton aria-label="ChatBubble" color="inherit">
                                            <MoreHorizIcon style={{width:20,height:'auto'}} />
                                            </IconButton>
                                        </div>
                                      
                                    </div>
                                    )) }  

                                     </> : <><p>Empty Friend</p></>}    
                                </div>
    )
}


export default Friends