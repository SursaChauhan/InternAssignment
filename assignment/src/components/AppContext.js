import React, { createContext, useState } from 'react'

const AppContext =createContext();

export const AppProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated] =useState(false);
    const [jstoken,setJsToken] =useState(null);

    const login=(token)=>{
        setIsAuthenticated(true);
        setJsToken(token);
    }
    const logout=()=>{
        setIsAuthenticated(false);
        setJsToken(null);

    }
    return(
        <>
        <AppContext.Provider value={{isAuthenticated,login,logout,jstoken}}>
{children}
        </AppContext.Provider>
        </>
    )
}

export default AppContext