import React,{useContext, useState} from 'react';
import AppContext from './AppContext';
import { Navigate } from 'react-router-dom';
import './Login.css'


const Login = () => {
const {login}=useContext(AppContext);
const [username,setUserName] =useState('');
const [password,setPassword] =useState('');
const [usertoken,setUserToken] =useState('');

const handleSubmit =async(e)=>{
e.preventDefault();
try{
  const response =await fetch('https://dummyjson.com/auth/login',{
    method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username: username,
    password: password,
     expiresInMins: 60, 
    // optional
  }),

  });
  const { token } = await response.json() || localStorage.getItem('token');
  console.log(token);
  localStorage.setItem('token', JSON.stringify(token));

if(token){
  setUserToken(token);
  login(token);
}else{
  throw new console.error("login error token not available");
}
 

}catch(err){
  console.log(err.message);
}
}
if (usertoken) {
  return <Navigate to="/home" />;
}
  return (
    <div className="login-container">
        <img
    className="background-image"
    src="https://buildwithinnovation.com/wp-content/uploads/2022/10/retina-logo.png"
    alt="background-img"
  />
       <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back! Log In Now.</h2>
        <div className="form-group">
          <label htmlFor="username">UserName</label>
          <input type="text" id="username" name="username" placeholder='Enter username' onChange={(e) => setUserName(e.target.value)}  />
          
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
  

    </div>
  )
}

export default Login