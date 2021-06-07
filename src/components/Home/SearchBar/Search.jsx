import React from 'react'
import Chip from "../Chip/Chip"
import "./style.css"

const Search = () => {


    return (
        <div className="search-container">
            <div className="basic-search">
                <div className="filter">
                    <span>Filter by : </span>
                    <Chip label="Age" />
                    <Chip label="Location" />
                    <Chip label="Fame Rating" />
                    <Chip label="Common Tags" />
                </div>
            </div>
        </div>
    )
}

export default Search;