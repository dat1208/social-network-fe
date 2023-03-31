import React from 'react';
import { Route } from 'react-router-dom';
import './styles-profile.css';
import {useParams} from 'react-router-dom';
import Navbar from '../components/navigation/top/Navbar';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';

const Profile: React.FC = (): JSX.Element => {
    const { userID } = useParams<{userID: string}>();



    return ( 
        
        <div>
            <Navbar></Navbar>
            <div className="Main row w-100">
                <div className="col-10">
                    <div className="row user_info w-100 margin-0">
                            <div className="row banner p-0">
                                
                            </div>
                            <div className="row bottom">
                                <div className="col-md text-left align-self-end">
                                    <p className='align-self-end' ><span className='fw-bold'>13</span> friends <span style={{marginLeft:'3%'}} className='fw-bold'>2</span> posts</p>                                
                                </div>
                                <div className="col-md bootom-right d-flex justify-content-end align-self-end">
                                    <a className='bottom-icon-a'><BsFacebook className='bottom-icon'></BsFacebook></a>
                                    <a className='bottom-icon-a'><BsInstagram className='bottom-icon'></BsInstagram></a>
                                    
                                </div>
                            </div>
                    </div>
                </div>
                <div className="col-md right-col">
                    <p className='border rounded'>Notify col</p>
                </div>
                
            </div>
        </div>
    )
    
   
    
  }


export default Profile;