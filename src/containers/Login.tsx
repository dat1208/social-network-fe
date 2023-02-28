import React from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import background from '../static/login/background.jpg'
function Login() {
  return (
    <div>   
        <div style={{height:"100vh"}} className='row'>
            <div className='col d-flex align-items-center justify-content-center' style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",opacity:1}} >
              <div>
                <h2 style={{float:'left',fontWeight:'bolder',opacity:1}}>BuddyBoss</h2>
                <br />
                <p style={{float:'left'}} > Sell memberships, courses, and build online communities.</p>
              </div> 
            </div>
            <div className='col d-flex align-items-center justify-content-center'>
              <div>
                <div>
                  <div className='align-items-left d-flex'>
                  <h2 style={{fontWeight:'bolder'}}>Online Social Network</h2>
                </div>
                <div className='align-items-left d-flex mt-3'>
                    <h5 style={{fontWeight:'bolder'}}>Sign in</h5>
                  </div>
                </div>
              <div className="input-form mt-2">
                <div className='w-100'>   
                  <div className="form-outline w-100">
                  <input style={{marginBottom:10}} placeholder='Email Address' type="text" id="form12" className="form-control" />  
                </div>
                  <div className="form-outline w-100">
                  <input  type="text" placeholder='Password' id="form12" className="form-control" />  
                </div>
                </div>
              </div>
              <div className="row mt-4 d-flex">
                <div className="col align-items-left d-flex">
                  <input style={{marginRight:10}} type="checkbox" className="form-check-input" />
                  <span>Remember me</span>
                </div>
                <div className="col text-right">
                  <a style={{textDecoration:'none',color:'#5a5a5a'}} href='#'>For got password?</a>
                </div>
              </div>  
              <div>
                <Button className="button btn btn-primary w-100 mt-4" style={{backgroundColor:'#69BFFF',border:'none',fontWeight:'bolder'}}>Login</Button>
              </div>
              <div className="privacy mt-4">
                <p><a style={{textDecoration:'none',color:'#5a5a5a',fontWeight:550}} href='#'>Terms of Service</a> and <a style={{textDecoration:'none',color:'#5a5a5a',fontWeight:550}} href='#'>Privacy Policy</a></p>
              </div>
              </div>
            </div>
        </div>
    </div>
    
    
  )
}

export default Login