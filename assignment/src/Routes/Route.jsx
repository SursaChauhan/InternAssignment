import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import ProtectedRoute from './ProtectedRoute';
import { useContext } from 'react';
import AppContext from '../components/AppContext';

const Routers = () => {
    const {isAuthenticated}=useContext(AppContext);

  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={ isAuthenticated ? <Home/> : <Navigate to='/' replace/>}/>
            
        </Routes>
    </div>
  )
}

export default Routers