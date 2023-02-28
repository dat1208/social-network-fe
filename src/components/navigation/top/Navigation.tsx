import React from 'react'
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { FiActivity } from 'react-icons/fi'
import { FaUserFriends } from 'react-icons/fa'
import {MdGroups} from 'react-icons/md'
import{MdForum} from 'react-icons/md'
import{RiPagesFill} from 'react-icons/ri'
import{BiSearch} from 'react-icons/bi'
function Navigation (){
    return(
        
        <div>
            <div style={{width:'100wh',height:70}} className='nav align-items-center'>
                <Nav className='w-100 row'>
                    <div className='col left-nav align-items-left justify-content-left'>
                        <h5>Social Network</h5>
                    </div>
                    <div className='col center-nav align-items-center justify-content-center'>
                        <a><FiActivity></FiActivity></a>
                        <a><FaUserFriends></FaUserFriends></a>
                        <a><MdForum></MdForum></a>
                        <a><RiPagesFill></RiPagesFill></a>
                        <a><MdGroups></MdGroups></a>
                    </div>
                    <div className='col right-nav align-items-right justify-content-right'>
                        <a><BiSearch></BiSearch></a>
                        <a>Sign in</a>
                    </div>
                </Nav>
            </div>
        </div>
    )
}
export default Navigation