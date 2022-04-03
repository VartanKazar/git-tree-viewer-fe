import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const GraphPage = () => {

    //Used for when a user clicks on a specific commit in the graph.
    //This will route them to the /commit/<commit_id> page
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("")
    const [searchType, setSearchType] = useState("url")

    const handleNavigate = (commit) => {
        navigate('/commit')
    }

    const handleSearchChange = (event) => {

    }

    return (
        <div className='graph-page'>
            <form className='graph-page-form'>

                <label htmlFor="search-type">Search By</label>
                <select name="search-type" id="searchType">
                    <option value="userName">User Name</option>
                    <option value="repoName">Repository Name</option>
                </select>

                <textarea 
                placeholder="Paste a Github repo URL here, or search for a user/repo..."
                type="text-single"
                value={searchText}
                onChange={(e) => handleSearchChange(e)}
                />

                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                
            </form>
        </div>
    )
}

export default GraphPage;