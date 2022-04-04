import React, { useState, useContext, createContext } from "react";

export const GlobalStoreContext = createContext()

export const GlobalStoreProvider = ({children}) => {

    

    return (
    <GlobalStoreContext.Provider value = {{

    }}>
        {children}
    </GlobalStoreContext.Provider>
    )
}

export const useStore = () => useContext(GlobalStoreContext)