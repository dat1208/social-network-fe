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
            <div className='main_container'>
                <div className='col-3'>
                    <div className=" border rounded bg-white left-sidebar">
                        <div className="sidebar position-sticky">
                            <div>
                                <h4 className='left-sidebar-title'>Friends</h4>
                                <Friends></Friends>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-6'>
                    <div className='main-title row w-100'>
                        <h4 className='main-title padding-0'>Activity Feed</h4>
                    </div>
                    {/* This component is create new post */}
                    <div className='row border m-0 rounded bg-white create-post w-100'>
                        <CreatePost urlProfile={userDisplay.UserProfileUrl} name={userDisplay.DisplayName} urlAvatar={userDisplay.AvatarURL}></CreatePost>
                    </div>
                    
                    
                    <div className='bar-title row'>
                        <div className='col-6 padding-0'>
                            <a className='main-title-activity'><h4 className='main-title-activity'>All updates</h4></a>
                        </div>
                        <div className='col-6 col-auto padding-0 search'>
                        <div className="input-group rounded">
                            <input type="search" className="form-control rounded search-input" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            <span className="input-group-text border-0 search-icon" id="search-addon">
                            <i className="fas fa-search search-icon"></i>
                            </span>
                        </div>
                        </div>
                    </div>

                    {/* This component is one post */}
                    <PostCmpn></PostCmpn>
                    

                </div>
                <div className='col-md-push-3'>
                    <div className="border rounded bg-white right-sidebar row">
                        <Notification />

                        <div>
                            <h4 className='right-sidebar-title' >Latest updates</h4>
                            <div>
                                <div className='row row-right-sidebar-post'>
                                
                                        <div className="col-3 right-sidebar-post">
                                                <Avatar className='right-sidebar-post-img' alt="Đạt" src={'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'} />
                                        </div>
                                        <div className="col-8 right-sidebar-post">
                                                <div className="row right-sidebar-post-content">
                                                    <p> <a className='right-sidebar-post-user'>John</a> posted an update</p> 
                                                </div>
                                                <div className="row right-sidebar-post-date">
                                                    <p>2 year ago</p>
                                                </div>
                                        </div>
                                </div>
                                <div className='row row-right-sidebar-post'>
                                        <div className="col-3 right-sidebar-post">
                                                <img className='right-sidebar-post-img' src={'https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png'}></img>
                                        </div>
                                        <div className="col-8 right-sidebar-post">
                                                <div className="row right-sidebar-post-content">
                                                    <p> <a className='right-sidebar-post-user'>Adele</a> posted an update</p> 
                                                </div>
                                                <div className="row right-sidebar-post-date">
                                                    <p>2 year ago</p>
                                                </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border rounded bg-white right-sidebar row">
                        <div>
                            <h4 className='right-sidebar-title' >Recently Active Members</h4>
                            <div>
                                <div className='row row-right-sidebar-post'>
                                        <div className="col-3 right-sidebar-post">
                                                <img className='right-sidebar-post-img' src={'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'}></img>
                                        </div>
                                        <div className="col-8 right-sidebar-post">
                                                <div className="row right-sidebar-post-content">
                                                    <p> <a className='right-sidebar-post-user'>John</a> posted an update</p> 
                                                </div>
                                                <div className="row right-sidebar-post-date">
                                                    <p>2 year ago</p>
                                                </div>
                                        </div>
                                </div>
                                <div className='row row-right-sidebar-post'>
                                        <div className="col-3 right-sidebar-post">
                                                <img className='right-sidebar-post-img' src={'https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png'}></img>
                                        </div>
                                        <div className="col-8 right-sidebar-post">
                                                <div className="row right-sidebar-post-content">
                                                    <p> <a className='right-sidebar-post-user'>Adele</a> posted an update</p> 
                                                </div>
                                                <div className="row right-sidebar-post-date">
                                                    <p>2 year ago</p>
                                                </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default Navigation