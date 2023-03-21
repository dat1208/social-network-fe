import React, { useEffect, useState } from 'react'
import {Button, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {FiActivity} from 'react-icons/fi'
import {FaUserFriends} from 'react-icons/fa'
import {MdGroups} from 'react-icons/md'
import {MdForum} from 'react-icons/md'
import {RiPagesFill} from 'react-icons/ri'
import {BiSearch} from 'react-icons/bi'

import './styles.css'
import PostCmpn from '../../post/PostCmpn'
import CreatePost from '../../input/CreatePost'
 
import UserServices from '../../../services/user/UserServices'

import { User_Display } from '../../../interface/interfaces'
import Avatar from '@mui/joy/Avatar/Avatar'

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
            <div className='nav navbar navbar-expand-sm sticky-top align-items-center navcontainer border'>
                <Nav className='w-100 row'>
                    <div className='col-3 left-nav d-flex justify-content-center'>
                        <h4 className='margin-0' style={{fontWeight:700, marginLeft:30}} >Social Network</h4>
                    </div>
                    <div className='col-6 center-nav d-flex justify-content-center'>
                        <a className='center_nav_item'><FiActivity className='center_nav_item_icon'></FiActivity></a>
                        <a className='center_nav_item'><FaUserFriends className='center_nav_item_icon'></FaUserFriends></a>
                        <a className='center_nav_item'><MdForum className='center_nav_item_icon'></MdForum></a>
                        <a className='center_nav_item'><RiPagesFill className='center_nav_item_icon'></RiPagesFill></a>
                        <a className='center_nav_item'><MdGroups className='center_nav_item_icon'></MdGroups></a>
                    </div>
                    <div className='col-3 right-nav d-flex justify-content-center'>
                        <a className='center_nav_item_icon'><BiSearch className='center_nav_item_icon'></BiSearch></a>
                        
                    </div>
                </Nav>
            </div>
            <div className='main_container'>
                <div className='col-sm-auto col'>
                    <div className=" border rounded bg-white left-sidebar">
                        <div className="sidebar position-sticky">
                            <div>
                                <h4 className='left-sidebar-title'>Blog</h4>
                                <div>
                                    <div className='row row-left-sidebar-post'>
                                        <div className="col-4 left-sidebar-post">
                                            <img className='left-sidebar-post-img' src={'https://himoon.vn/wp-content/uploads/2022/06/blog-ca-nhan-bang-wordpress-create-a-blog-2022.png'}></img>
                                        </div>
                                        <div className="col-8 left-sidebar-post">
                                            <div className="row left-sidebar-post-content">
                                            Tackle Your closest Spring cleaning
                                            </div>
                                            <div className="row left-sidebar-post-date">
                                            May 14, 2019
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row row-left-sidebar-post'>
                                        <div className="col-4 left-sidebar-post">
                                            <img className='left-sidebar-post-img' src={'https://www.marketing365.com.br/wp-content/uploads/2018/12/5-dicas-para-melhor-seu-blog.png'}></img>
                                        </div>
                                        <div className="col-8 left-sidebar-post">
                                            <div className="row left-sidebar-post-content">
                                            The Truth About Business Blogging
                                            </div>
                                            <div className="row left-sidebar-post-date">
                                            May 14, 2019
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='main-title row w-100'>
                        <h4 className='main-title padding-0'>Activity Feed</h4>
                    </div>
                    {/* This component is create new post */}
                    <CreatePost urlProfile={userDisplay.UserProfileUrl} name={userDisplay.DisplayName} urlAvatar={userDisplay.AvatarURL}></CreatePost>
                    
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