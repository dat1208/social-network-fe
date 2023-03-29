import React, { useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import background from '../static/login/background.jpg'
import './styles-signup.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import signup from '../services/api/Auth/signup';
function Signup() {

  const [displayname, setDisplayname] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isDisabled, setIsDisabled] = React.useState(true);

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
    event.preventDefault();
    const validPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/);
    const validEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if(username === "" || displayname === ""){
      Swal.fire({
        title: 'Please type your name',
        icon: 'warning',
        confirmButtonText: 'Try Again'
    })
    }
    else if(!validPassword.test(password))
    {
      Swal.fire({
        title: 'Passwords validation failed',
        text: 'One uppercase, one lowercase, one special character, and minimum 8 characters required',
        icon: 'warning',
        confirmButtonText: 'Try Again'
    })
      setPassword('');
    }
    else if(!validEmail.test(email))
    {
      Swal.fire({
        title: 'Email validation failed',
        icon: 'warning',
        confirmButtonText: 'Try Again'
    })
      setEmail('');
    }
    else {
       await signup(username,displayname,password,email);
    
    }
    

  };
  return (
    <div>
      <div style={{ height: "100vh" }} className='row'>
        <div className='col-7 d-flex align-items-center justify-content-center' style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: 1 }} >
          <div>
            <h2 style={{ float: 'left', fontWeight: 'bolder', opacity: 1 }}>BuddyBoss</h2>
            <br />
            <p style={{ float: 'left' }} > Join with us.</p>
          </div>
        </div>
        <div className='col-5 d-flex align-items-center justify-content-center'>
          <div>
            <div>
              <div className='align-items-left d-flex'>
                <h2 style={{ fontWeight: 'bolder' }}>Online Social Network</h2>
              </div>
              <div className='align-items-left d-flex mt-3'>
                <h5 style={{ fontWeight: 'bolder' }}>Sign up</h5>
              </div>
            </div>
            <div className="input-form mt-2">
              <div className='w-100'>
                <div className="form-outline w-100">
                  <input style={{marginBottom:10}}  placeholder='Display name' value={displayname} onChange={(e) => {setDisplayname(e.target.value)}} maxLength={50} type="text" className="form-control" />
                </div>
                <div className="form-outline w-100">
                  <input style={{marginBottom: 10 }} placeholder='Username' onChange={handleChangeUsername} value={username} type="text" id="form-username" className="form-control" />
                </div>
                <div className="form-outline w-100">
                  <input style={{marginBottom:10}} type="password" maxLength={50}  placeholder='Password' id="form-password" onChange={handleChangePassword} value={password} className="form-control" />
                </div>
                <div className="form-outline w-100">
                  <input style={{marginBottom:10}}  type="email" value={email} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} id="form-date" className="form-control" />
                </div>
                
              </div>
            </div>
            
            <div>
              <Button id='btn-singup' onClick={btnLoginClick} className="button btn btn-primary w-100 mt-4" disabled={isDisabled} style={{ backgroundColor: '#69BFFF', border: 'none', fontWeight: 'bolder' }}>Sign Up</Button>
            </div>

          </div>
        </div>
      </div>
    </div>


  )
}

export default Signup