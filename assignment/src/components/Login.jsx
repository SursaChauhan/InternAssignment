import React,{useContext} from 'react';
import AppContext from './AppContext'

const Login = () => {
const {isAuthenticated}=useContext(AppContext);
console.log(isAuthenticated);
  return (
    <div>Login</div>
  )
}

export default Login