import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import LOCAL_CONFIG from '../Config/CONFIG_LOCAL';

export const ApiHandlerContext = createContext()


export const ApiHandlerProvider = ({children}) => {
    
    const GitClient = axios.create({
        baseURL: LOCAL_CONFIG.BASE_GIT_URL,
        timeout: 5000

    })

    //Sends out a GET request to the https://api.github.com/search/repositories github api endpoint.
    const gitRepoSearch = async (params) => {


        var queryString = `${params.repoName}`

        return await GitClient.get(`search/repositories?q=${params.repoName}`)
        .then((res) => res.data.items)
        .catch(err => {
            console.log(err)
            return undefined
        })
    }

    return (
        <ApiHandlerContext.Provider value = {{
            gitRepoSearch
        }}>
            {children}
        </ApiHandlerContext.Provider>
    )
}
 
export const useApiHandler = () => useContext(ApiHandlerContext)