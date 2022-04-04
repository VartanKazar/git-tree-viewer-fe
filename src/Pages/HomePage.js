import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faArrowLeftLong, faArrowRightLong} from '@fortawesome/free-solid-svg-icons'

import { useApiHandler } from '../Helpers/ApiHandler';

const HomePage = () => {

    var HashMap = require('hashmap');

    //Used for when a user clicks on a specific commit in the graph.
    //This will route them to the /commit/<commit_id> page
    const navigate = useNavigate();

    const { gitRepoSearch } = useApiHandler()

    const [pageView, setPageView] = useState("search")
    const [repoName, setRepoName] = useState("")
    const [modal, setModal] = useState(0)
    const [repositories, setRepositories] = useState([])
    const [searchErr, setSearchErr] = useState()

    const handleNavigate = (commit) => {
        navigate('/graph')
    }

    const handleRepoNameChange = (event) => {
        setRepoName(event.target.value)
    }

    const handleSearchClick = async () => {
        
        await gitRepoSearch({
            repoName: repoName
        })
        .then(res => {
            if(res === undefined)
                setSearchErr("Something went wrong with your search.  Please try again.")
            
            else if(res && res.length === 0)
                setSearchErr("Search returned no results.")

            else {
                setRepositories(res)
                setPageView("selection")
                setSearchErr(undefined)
            }

            
        })
    }

    const handleRepoSelect = (index) => {
        
    }

    const handleBackClick = () => {
        setPageView("search")
    }

    const handleForwardClick = () => {
        setPageView("selection")
    }

    return (
        (pageView === "search") ? 

        <div className='home-page'>
            
            <h1>Search By...</h1>

            <>
                {`For a complete list of everything you can do please visit the `}

                <a href="https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories">
                    Github API search documentation
                </a>
            </>

            <form className='home-page-form'>

                <textarea 
                placeholder="Repository Name..."
                type="text-single"
                value={repoName}
                onChange={(e) => handleRepoNameChange(e)}
                />
                {searchErr ?
                <div style = {{width: '100%', textAlign: "center"}}>

                    <h4 style = {{color: "red", textDecoration: "italic"}}>
                        {searchErr}
                    </h4>
                </div>

                :

                <div style = {{width: '100%'}}/>
                }

                <button type="button" disabled={!repoName} onClick={() => handleSearchClick()} className="primary-button">
                    {<FontAwesomeIcon icon={faMagnifyingGlass} className="button-icon"/>}
                </button>
                
                {repositories.length > 0 &&
                    <button type="button" onClick={() => handleForwardClick()} className="primary-button">
                        {<FontAwesomeIcon icon={faArrowRightLong} className="button-icon"/>}
                    </button>
                }
            </form>

        </div>

:

        <div className='repo-selection-page'>
            <button type="button" onClick={() => handleBackClick()} className="primary-button">
                {<FontAwesomeIcon icon={faArrowLeftLong} className="button-icon"/>}
            </button>

            <div className='search-results-container'>
            {repositories.length > 0 &&
                repositories.map((repo, index) => (
                    <div key={repo.id} className="repo-selection-item" onClick={() => handleRepoSelect(index)}>
                        <h3>{repo.name}</h3>
                        <h4>{`${repo.owner.type === "User" ? "User" : "Organization"}: ${repo.owner.login}`}</h4>
                        <b>{`Language: ${repo.language}`}</b>
                        <div style = {{maxHeight: "8rem", overflowY: "auto", scrollbarWidth: "thin"}}>
                        {repo.description}
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default HomePage;