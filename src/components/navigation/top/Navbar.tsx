import {FiActivity} from 'react-icons/fi'
import {FaUserFriends} from 'react-icons/fa'
import {MdGroups} from 'react-icons/md'
import {MdForum} from 'react-icons/md'
import {RiPagesFill} from 'react-icons/ri'
import {BiSearch} from 'react-icons/bi'
import {Button, Nav} from 'react-bootstrap'
import HomeIcon from '@mui/icons-material/Home';
import React from 'react'
import './styles.css'
import { Avatar, IconButton } from '@mui/material'
import UserServices from '../../../services/user/UserServices'
import TokenServices from '../../../services/token/TokenServices'
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2/dist/sweetalert2.js'

function Navbar (){

    const [userDisplay, setUserDisplay] = React.useState({
        "Id": "",
        "AvatarURL": "",
        "DisplayName": "",
        "UserProfileUrl": ""
    });
    
    React.useEffect(() =>{

        const getUser = () => {
            if( typeof(UserServices.getUserDisplay()) != undefined || null )
        {
            const user = JSON.parse(UserServices.getUserDisplay() || '{}');
            setUserDisplay(user);
            
        }
        };
        getUser();
       },[]);
    function logout() {

        Swal.fire({
            title: 'Confirm Logout',
            text: 'Are you sure you want to logout!',
            icon: 'warning',
            showConfirmButton:true,
            showCancelButton:true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if(result.isConfirmed)
            {
                
                TokenServices.clearToken();
            }
                
        });

        //
    }  
       
    return(
            <div className='nav navbar navbar-expand-sm sticky-top align-items-center navcontainer border'>
                <Nav className='w-100 row'>
                    <div className='col-3 left-nav d-flex justify-content-center'>
                        <h4 className='margin-0' style={{fontWeight:700, marginLeft:30}} >Social Network</h4>
                    </div>
                    <div className='col-6 center-nav d-flex justify-content-center'>
                        <a href='/home' className='center_nav_item'><HomeIcon className='center_nav_item_icon'></HomeIcon></a>
                        <a className='center_nav_item'><FaUserFriends className='center_nav_item_icon'></FaUserFriends></a>
                        <a className='center_nav_item'><MdForum className='center_nav_item_icon'></MdForum></a>
                        <a className='center_nav_item'><RiPagesFill className='center_nav_item_icon'></RiPagesFill></a>
                        <a onClick={() => {
                            alert("Hehe");
                        }} className='center_nav_item'><MdGroups className='center_nav_item_icon'></MdGroups></a>
                    </div>
                    <div className='col-3 right-nav d-flex justify-content-center'>
                        
                        <a href={'/profile/'+userDisplay.Id}><Avatar className='center_nav_item_icon' src={userDisplay.AvatarURL} alt={userDisplay.DisplayName} ></Avatar></a>
                        <IconButton onClick={logout} style={{marginLeft:"1%"}}><LogoutIcon className='center_nav_item_icon'></LogoutIcon></IconButton>
                    </div>
                </Nav>
            </div>
    )
}

export default Navbar;