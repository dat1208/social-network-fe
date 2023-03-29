import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import background from '../static/login/background.jpg'
import './styles-login.css'
import SweetAlert2 from 'react-sweetalert2';
import login from '../services/api/Auth/login'
import UserServices from '../services/user/UserServices'

import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch } from '../store/store';
import { setUserSession } from "../store/features/userSessionSlice";
import { useAppSelector } from '../store/store'


import { Token_User } from "../interface/interfaces";

import LoadingCmpt from '../components/loading/LoadingCmpt'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  /*Test area*/

  //const user = useAppSelector(state=>state.user.user);

  /*Test area*/
  

  /* useState */
  const [swalProps, setSwalProps] = useState({});
  const [username, setUsername] = React.useState("thanhdatne")
  const [password, setPassword] = React.useState("thanhdatnepass")
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [loading, setloading] = React.useState(true);
  /* useState */
  
  const navigate = useNavigate();


 function alert(title:string, text?:string, icon?:string) {
      setSwalProps({
          show: true,
          title: title,
          text: text,
          icon: icon,
      });
  }

  function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value.toString());
    if (event.target.value.length > 0) {
      setIsDisabled(false);
    }
    else if (event.target.value.length == 0) {
      setIsDisabled(true);
    }
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value.toString());
    if (event.target.value.length > 0) {
      setIsDisabled(false);
    }
    else if (event.target.value.length == 0) {
      setIsDisabled(true);
    }
  }

  // This function will be triggered when the login-btn is clicked
  const btnLoginClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    
    event.preventDefault()
    let data;

    try {
      data = await login(username, password) as unknown as Token_User;
    } catch (error) {
      console.log(error);
    }
    
    if(data != null) {
      console.log(data.User);

      const user = data.User;

      UserServices.storeUserDisplay(user);

      dispatch(setUserSession({
        user_Display: {
          Id :user.Id,
          AvatarURL:user.AvatarURL,
          DisplayName:user.DisplayName,
          UserProfileUrl:user.UserProfileUrl
        }
    }))
    navigate("/home");
    }
    
    setUsername('');
    setPassword('');
    setIsDisabled(true);
    

  };
  const dispatch = useAppDispatch();  

  return (
    <div>
      <div style={{ height: "100vh" }} className='row'>
        <div className='col-7 d-flex align-items-center justify-content-center' style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: 1 }} >
          <div>
            <h2 style={{ float: 'left', fontWeight: 'bolder', opacity: 1 }}>BuddyBoss</h2>
            <br />
            <p style={{ float: 'left' }} > Sell memberships, courses, and build online communities.</p>
          </div>
        </div>
        <div className='col-5 d-flex align-items-center justify-content-center'>
          <div>
            <div>
              <div className='align-items-left d-flex'>
                <h2 style={{ fontWeight: 'bolder' }}>Online Social Network</h2>
              </div>
              <div className='align-items-left d-flex mt-3'>
                <h5 style={{ fontWeight: 'bolder' }}>Sign in</h5>
              </div>
            </div>
            <div className="input-form mt-2">
              <div className='w-100'>
                <div className="form-outline w-100">
                  <input style={{ marginBottom: 10 }} placeholder='Email Address or username' onChange={handleChangeUsername} value={username} type="text" id="form-username" className="form-control" />
                </div>
                <div className="form-outline w-100">
                  <input type="password" placeholder='Password' id="form-password" onChange={handleChangePassword} value={password} className="form-control" />
                </div>
              </div>
            </div>
            <div className="row mt-4 d-flex">
              <div className="col align-items-left d-flex">
                <input style={{ marginRight: 10 }} type="checkbox" className="form-check-input" />
                <span>Remember me</span>
              </div>
              <div className="col text-right">
                <a style={{ textDecoration: 'none', color: '#5a5a5a' }} href='#'>For got password?</a>
              </div>
            </div>
            <div>
              <Button id='btn-login' onClick={btnLoginClick} className="button btn btn-primary w-100 mt-4" disabled={isDisabled} style={{ backgroundColor: '#69BFFF', border: 'none', fontWeight: 'bolder' }}>Login</Button>            </div>
            <div>
            </div>
            <div>
            </div>
            <div style={{ opacity: 0.8 }} className="privacy mt-4">
              <p> Don't have an account ? <a style={{ textDecoration: 'none', color: '#5a5a5a' }} href='/signup'>Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </div>


  )
}

export default Login