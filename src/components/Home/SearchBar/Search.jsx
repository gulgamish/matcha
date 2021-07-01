import React, { useEffect, useState } from 'react'
import {
    Button,
    Divider, Slider, Typography
} from "@material-ui/core"
import Chip from "../Chip/Chip"
import InputTags from "../../../sub-components/InputTag/InputTag"
import "./style.css"
import * as _ from "../../../Constants/sort"
import { useLazyQuery } from '@apollo/client'
import { USERS_SORTED_FILTRED } from '../../../GraphQl/Match/Queries'

const Search = ({
    setUsers
}) => {
    const [ selected, setSelected ] = useState(null);
    const [ filter, setFilter ] = useState({
        age: {
            min: 0,
            max: 0
        },
        distance: {
            min: 0,
            max: 0
        },
        score: {
            min: 0,
            max: 0
        },
        interests: []
    })
    const [ browse, { data, loading } ] = useLazyQuery(USERS_SORTED_FILTRED);

    console.log(selected);

    
    useEffect(() => {
        if (!loading && selected != null) {
            if (data.browseUsers) {
                console.log(data.browseUsers);
                setUsers(data.browseUsers)
            }
        }
    }, [data])
    
    const filterUsers = () => {
            browse({
                variables: {
                    filterBy: filter
                }
            })
    }
    useEffect(() => {
        if (selected != null) {
            if (selected === _.NONE)
                browse();
            else
                browse({
                    variables: {
                        orderBy: JSON.parse(selected)
                    }
                })
        }
    }, [selected])

    return (
        <div className="search-container">
            <div className="basic-search">
                <div className="sort">
                    <span>Sort by : </span>
                    <Chip
                        label="Age"
                        isUpActive={selected === _.AGE_ASC}
                        isDownActive={selected === _.AGE_DSC}
                        onUpClick={() => {
                            if (selected === _.NONE)
                                setSelected(_.AGE_ASC);
                            else
                                setSelected(_.NONE);
                        }}
                        onDownClick={() => {
                            if (selected === _.NONE)
                                setSelected(_.AGE_DSC);
                            else
                                setSelected(_.NONE)
                        }}
                    />
                    <Chip
                        label="Location"
                        isUpActive={selected === _.LOCATION_ASC}
                        isDownActive={selected === _.LOCATION_DSC}
                        onUpClick={() => {
                            if (selected === _.NONE)
                                setSelected(_.LOCATION_ASC);
                            else
                                setSelected(_.NONE);
                        }}
                        onDownClick={() => {
                            if (selected === _.NONE)
                                setSelected(_.LOCATION_DSC);
                            else
                                setSelected(_.NONE);
                        }}
                    />
                    <Chip
                        label="Fame Rating"
                        isUpActive={selected === _.F_RATING_ASC}
                        isDownActive={selected === _.F_RATING_DSC}
                        onUpClick={() => {
                            if (selected === _.NONE)
                                setSelected(_.F_RATING_ASC);
                            else
                                setSelected(_.NONE);
                        }}
                        onDownClick={() => {
                            if (selected === _.NONE)
                                setSelected(_.F_RATING_DSC);
                            else
                                setSelected(_.NONE);
                        }}
                    />
                    <Chip
                        label="Common Tags"
                        isUpActive={selected === _.TAGS_ASC}
                        isDownActive={selected === _.TAGS_DSC}
                        onUpClick={() => {
                            if (selected === _.NONE)
                                setSelected(_.TAGS_ASC);
                            else
                                setSelected(_.NONE);
                        }}
                        onDownClick={() => {
                            if (selected === _.NONE)
                                setSelected(_.TAGS_DSC);
                            else
                                setSelected(_.NONE);
                        }}
                    />
                </div>
                <hr
                    className="divider"
                />
                <div className="filter">
                    <div className="filter-controllers">
                        <div className="filter-wrapper">
                            <Typography id="track-inverted-range-slider" gutterBottom>
                                Age
                            </Typography>
                            <Slider
                                aria-labelledby="track-inverted-range-slider"
                                onChange={(e, newv) => {
                                    setFilter({
                                        ...filter,
                                        age: {
                                            min: newv[0],
                                            max: newv[1]
                                        }
                                    })
                                }}
                                defaultValue={[18, 25]}
                                marks={[
                                    
                                ]}
                                valueLabelDisplay="auto"
                                min={18}
                                max={60}
                                marks={[18, 25, 40, 60].map(elem => {
                                    return {
                                        value: elem,
                                        label: `${elem}`
                                    }
                                })}
                            />
                        </div>
                        <div className="filter-wrapper">
                            <Typography id="track-inverted-range-slider" gutterBottom>
                                Distance
                            </Typography>
                            <Slider
                                aria-labelledby="track-inverted-range-slider"
                                onChange={(e, newv) => {
                                    setFilter({
                                        ...filter,
                                        distance: {
                                            min: newv[0],
                                            max: newv[1]
                                        }
                                    })
                                }}
                                valueLabelDisplay="auto"
                                defaultValue={[0, 20]}
                                min={0}
                                max={100}
                                marks={[0, 20, 40, 60, 80, 100].map(elem => {
                                    return {
                                        value: elem,
                                        label: `${elem} km`
                                    }
                                })}
                            />
                        </div>
                        <div className="filter-wrapper">
                            <Typography gutterBottom>
                                Fame Rating
                            </Typography>
                            <Slider
                                onChange={(e, newv) => {
                                    setFilter({
                                        ...filter,
                                        score: {
                                            min: newv[0],
                                            max: newv[1]
                                        }
                                    })
                                }}
                                defaultValue={[0, 60]}
                                valueLabelDisplay="auto"
                                max={100}
                                marks={[0, 30, 60, 100].map(elem => {
                                    return {
                                        value: elem,
                                        label: `${elem}`
                                    }
                                })}
                            />
                        </div>
                        <div className="filter-wrapper">
                            <Typography>
                                Common tags
                            </Typography>
                            <InputTags
                                onChange={(tag) => {
                                    setFilter({
                                        ...filter,
                                        interests: [
                                            ...filter.interests,
                                            tag
                                        ]
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className="filter-button">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={filterUsers}
                        >
                            Filter
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;