import React, { useState } from 'react'
import {
    Divider, Slider
} from "@material-ui/core"
import Chip from "../Chip/Chip"
import "./style.css"

const Search = () => {
    const [ check, setCheck ] = useState({
        age: {
            up: false,
            down: false
        },
        location: {
            up: false,
            down: false
        },
        fameRating: {
            up: false,
            down: false
        },
        commonTags: {
            up: false,
            down: false
        }
    });
    const [ filter, setFilter ] = useState({
        age: 18
    })

    return (
        <div className="search-container">
            <div className="basic-search">
                <div className="sort">
                    <span>Sort by : </span>
                    <Chip
                        label="Age"
                        isUpActive={check.age.up}
                        isDownActive={check.age.down}
                        onUpClick={() => {
                            setCheck({
                                age: {
                                    up: !check.age.up,
                                    down: false
                                },
                                location: {
                                    up: false,
                                    down: false
                                },
                                fameRating: {
                                    up: false,
                                    down: false
                                },
                                commonTags: {
                                    up: false,
                                    down: false
                                }
                            })
                        }}
                        onDownClick={() => {
                            setCheck({
                                age: {
                                    up: false,
                                    down: !check.age.down
                                },
                                location: {
                                    up: false,
                                    down: false
                                },
                                fameRating: {
                                    up: false,
                                    down: false
                                },
                                commonTags: {
                                    up: false,
                                    down: false
                                }
                            })
                        }}
                    />
                    <Chip
                        label="Location"
                        isUpActive={check.location.up}
                        isDownActive={check.location.down}
                        onUpClick={() => {
                            setCheck({
                                location: {
                                    up: !check.location.up,
                                    down: false
                                },
                                age: {
                                    up: false,
                                    down: false
                                },
                                fameRating: {
                                    up: false,
                                    down: false
                                },
                                commonTags: {
                                    up: false,
                                    down: false
                                }
                            })
                        }}
                        onDownClick={() => {
                            setCheck({
                                location: {
                                    up: false,
                                    down: !check.location.down
                                },
                                age: {
                                    up: false,
                                    down: false
                                },
                                fameRating: {
                                    up: false,
                                    down: false
                                },
                                commonTags: {
                                    up: false,
                                    down: false
                                }
                            })
                        }}
                    />
                    <Chip
                        label="Fame Rating"
                        isUpActive={check.fameRating.up}
                        isDownActive={check.fameRating.down}
                        onUpClick={() => {
                            setCheck({
                                fameRating: {
                                    up: !check.fameRating.up,
                                    down: false
                                },
                                age: {
                                    up: false,
                                    down: false
                                },
                                location: {
                                    up: false,
                                    down: false
                                },
                                commonTags: {
                                    up: false,
                                    down: false
                                }
                            })
                        }}
                        onDownClick={() => {
                            setCheck({
                                fameRating: {
                                    up: false,
                                    down: !check.fameRating.down
                                },
                                age: {
                                    up: false,
                                    down: false
                                },
                                location: {
                                    up: false,
                                    down: false
                                },
                                commonTags: {
                                    up: false,
                                    down: false
                                }
                            })
                        }}
                    />
                    <Chip
                        label="Common Tags"
                        isUpActive={check.commonTags.up}
                        isDownActive={check.commonTags.down}
                        onUpClick={() => {
                            setCheck({
                                commonTags: {
                                    up: !check.commonTags.up,
                                    down: false
                                },
                                age: {
                                    up: false,
                                    down: false
                                },
                                location: {
                                    up: false,
                                    down: false
                                },
                                fameRating: {
                                    up: false,
                                    down: false
                                }
                            })
                        }}
                        onDownClick={() => {
                            setCheck({
                                commonTags: {
                                    up: false,
                                    down: !check.commonTags.down
                                },
                                age: {
                                    up: false,
                                    down: false
                                },
                                location: {
                                    up: false,
                                    down: false
                                },
                                fameRating: {
                                    up: false,
                                    down: false
                                }
                            })
                        }}
                    />
                </div>
                <hr
                    className="divider"
                />
                <div className="filter">
                    <div className="filt">
                        <Slider
                            value={filter.age}
                            valueLabelDisplay="auto"
                            onChange={(e, newValue) => {
                                setFilter({
                                    ...filter,
                                    age: newValue
                                })
                            }}
                            aria-labelledby="range-slider"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;