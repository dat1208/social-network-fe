import React, { useEffect, useState } from 'react'


import './styles.css'
import PostCmpn from '../../post/PostCmpn'
import CreatePost from '../../input/CreatePost'
 
import UserServices from '../../../services/user/UserServices'

import { User_Display } from '../../../interface/interfaces'
import Avatar from '@mui/joy/Avatar/Avatar'
import Friends from './Friends'
import Navbar from './Navbar'
import { Notification } from '../../notify/notify'
import Search from '../../input/Search'

function Navigation (){

    /* useState */
    const [userDisplay, setUserDisplay] = React.useState({
        "Id": "",
        "AvatarURL": "",
        "DisplayName": "",
        "UserProfileUrl": ""
    });
    
    /* useState */


    useEffect(() =>{

        const getUser = () => {
            if( typeof(UserServices.getUserDisplay()) != undefined || null )
        {
            const user = JSON.parse(UserServices.getUserDisplay() || '{}');
            setUserDisplay(user);
            
        }
        };
        getUser();
        console.log(userDisplay);
       },[]);

       
    return(    
        <div>
            <Navbar></Navbar>
            <div className='main_container row'>
                <div className='col-md'>
                    <div className=" border rounded bg-white left-sidebar">
                        <div className="sidebar position-sticky">
                            <div>
                                <Friends></Friends>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-7'>
                    <div className='main-title row w-100'>
                        <h4 className='main-title padding-0'>Activity Feed</h4>
                    </div>
                    {/* This component is create new post */}
                    <div className='row border m-0 rounded bg-white create-post w-100'>
                        <CreatePost urlProfile={userDisplay.UserProfileUrl} name={userDisplay.DisplayName} urlAvatar={userDisplay.AvatarURL}></CreatePost>
                    </div>
                    
                    
                    <div className='bar-title m-0 row'>
                        <div className='col-12 text-left padding-0'>
                            <a className='main-title-activity'><h4 className='main-title-activity'>All updates</h4></a>
                        </div>
                        
                    </div>
                    <div style={{marginBottom:'2%'}}></div>

                    {/* This component is one post */}
                    <PostCmpn></PostCmpn>
                    

                </div>
                <div className='col-md'>
                    <div className="border rounded bg-white right-sidebar row">
                        <div>
                        <Notification />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default Navigation