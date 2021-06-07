import React, { useState } from 'react'
import Chip from "../Chip/Chip"
import "./style.css"

const Search = () => {
    const [ check, setCheck ] = useState({
        age: false,
        location: false,
        fameRating: false,
        commonTags: false
    });


    return (
        <div className="search-container">
            <div className="basic-search">
                <div className="filter">
                    <span>Sort by : </span>
                    <Chip
                        label="Age"
                        isActive={check.age}
                        onClick={() => {
                            setCheck({
                                ...!check,
                                age: !check.age
                            })
                        }}
                    />
                    <Chip
                        label="Location"
                        isActive={check.location}
                        onClick={() => {
                            setCheck({
                                ...!check,
                                location: !check.location
                            })
                        }}
                    />
                    <Chip
                        label="Fame Rating"
                        isActive={check.fameRating}
                        onClick={() => {
                            setCheck({
                                ...!check,
                                fameRating: !check.fameRating
                            })
                        }}
                    />
                    <Chip
                        label="Common Tags"
                        isActive={check.commonTags}
                        onClick={() => {
                            setCheck({
                                ...!check,
                                commonTags: !check.commonTags
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;