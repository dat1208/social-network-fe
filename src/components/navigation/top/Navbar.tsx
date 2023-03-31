import {FiActivity} from 'react-icons/fi'
import {FaUserFriends} from 'react-icons/fa'
import {MdGroups} from 'react-icons/md'
import {MdForum} from 'react-icons/md'
import {RiPagesFill} from 'react-icons/ri'
import {BiSearch} from 'react-icons/bi'
import {Button, Nav} from 'react-bootstrap'

import React from 'react'
import './styles.css'



function Navbar (){


    return(
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
    )
}

export default Navbar;