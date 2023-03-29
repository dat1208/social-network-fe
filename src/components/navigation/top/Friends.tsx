import { Fingerprint } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from 'react-bootstrap';


function Friends (){


    return(
                                <div>
                                    <div style={{marginBottom:30}} className='row row-left-sidebar-post'>
                                        <div className="col-sm-auto left-sidebar-post">
                                            <Avatar style={{width:50,height:50}} src={'https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg'} ></Avatar>
                                        </div>
                                        <div className="col-sm-auto left-sidebar-post">
                                            <div className="row left-sidebar-post-content">
                                                <a>Lê Đỗ Thành Đạt</a>
                                            </div>
                                            <div className="row left-sidebar-post-date">
                                                <a>Active</a>
                                            </div> 
                                        </div>
                                        <div style={{width:'fit-content'}} className='col-sm-auto'>
                                            <IconButton aria-label="ChatBubble" color="inherit">
                                            <ChatBubbleIcon style={{width:27,height:'auto'}} />
                                            </IconButton>
                                            <IconButton aria-label="ChatBubble" color="inherit">
                                            <MoreHorizIcon style={{width:27,height:'auto'}} />
                                            </IconButton>
                                        </div>
                                      
                                    </div>
                                    <div style={{marginBottom:15}} className='row row-left-sidebar-post'>
                                        <div className="col-sm-auto left-sidebar-post">
                                            <Avatar style={{width:50,height:50}} src={'https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg'} ></Avatar>
                                        </div>
                                        <div className="col-sm-auto left-sidebar-post">
                                            <div className="row left-sidebar-post-content">
                                                <a>Kim Khánh</a>
                                            </div>
                                            <div className="row left-sidebar-post-date">
                                                <a>Active 10 minutes</a>
                                            </div> 
                                        </div>
                                        <div style={{width:'fit-content'}} className='col-sm-auto'>
                                            <IconButton  aria-label="ChatBubble" color="inherit">
                                            <ChatBubbleIcon style={{width:27,height:'auto'}} />
                                            </IconButton>
                                            <IconButton aria-label="ChatBubble" color="inherit">
                                            <MoreHorizIcon style={{width:27,height:'auto'}} />
                                            </IconButton>
                                        </div>
                                      
                                    </div>

                                    
                                </div>
    )
}


export default Friends