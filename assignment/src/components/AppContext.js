import React, { createContext, useState } from 'react'

const AppContext =createContext();

export const AppProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated] =useState(false);

    const login=()=>{
        setIsAuthenticated(true);
    }
    const logout=()=>{
        setIsAuthenticated(false);
    }
    return(
        <>
        <AppContext.Provider value={{isAuthenticated,login,logout}}>
{children}
        </AppContext.Provider>
        </>
    )
}

export default AppContext