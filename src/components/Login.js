import React from 'react';
import './loginstyles.css';
import {Paper} from '@material-ui/core';

const Login = () => {

  return (

    <div className="container1">
       <Paper className='formpaper' variant='outlined' elevation={8} style={{borderRadius:'10%'}}>
        <h1 className="header">
            Log In
        </h1>
        <form action="" className="form">
            <div>
                <label for="email">Email:</label>
                <input type="text" name="email" placeholder='abc@x.com'/>
            </div>
            <br></br>
            <div>
                <label for="password">Password:</label>
                <input type="password" />
            </div>
            <br></br>
            <button type="button" className="btn btn-lg btn-info">Log In</button>
            <br></br><br></br>
            <p>or</p>
            <div class="d-grid gap-2">
              <button type="button" className="btn btn-lg btn-danger googlebtn"><i class="fab fa-google"></i>   Login Using Google</button>
            </div>
            <br></br>
            <p className='signupmessage'><i>Don't have an account yet?  </i><button type="button" className="btn btn-md btn-outline-success">  Sign Up</button></p>

        </form>
        </Paper>
    </div>

  );
}









export default Login;
