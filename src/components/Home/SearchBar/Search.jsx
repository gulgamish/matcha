import React, { useEffect, useState } from 'react'
import {
    Button,
    Divider, makeStyles, Slider, Typography
} from "@material-ui/core"
import Chip from "../Chip/Chip"
import InputTags from "../../../sub-components/InputTag/InputTag"
import "./style.css"
import * as _ from "../../../Constants/sort"
import { useLazyQuery } from '@apollo/client'
import { USERS_SORTED_FILTRED } from '../../../GraphQl/Match/Queries'
import { sort, filterList } from "../tools"
import { Cancel } from "@material-ui/icons"

const useStyles = makeStyles({
    button: {
        margin: "4px"
    }
})

const Search = ({
    users,
    setUsers,
    clear,
    setClear
}) => {
    const [ selected, setSelected ] = useState(null);
    const [ filter, setFilter ] = useState({
        age: {
            min: 18,
            max: 25
        },
        distance: {
            min: 0,
            max: 20
        },
        score: {
            min: 0,
            max: 60
        },
        interests: []
    })
    const [ browse, { data, loading } ] = useLazyQuery(USERS_SORTED_FILTRED);
    const { button } = useStyles();

    useEffect(() => {
        if (!loading) {
            if (data) {
                setUsers(data.browseUsers)
            }
        }
    }, [data, loading])

    useEffect(() => {
        if (selected != null) {
            browse({
                variables: {
                    orderBy: JSON.parse(selected)
                }
            })
        }
        else
            browse();
    }, [selected])

    useEffect(() => {
        if (clear) {
            setSelected(null);
            setFilter({
                age: {
                    min: 18,
                    max: 25
                },
                distance: {
                    min: 0,
                    max: 20
                },
                score: {
                    min: 0,
                    max: 60
                },
                interests: []
            });
            setClear(false);
        }
    }, [ clear ])

    const filterUsers = () => {
        //var newList = filterList(users, filter);
        //setUsers(newList);
        browse({
            variables: {
                orderBy: selected == null ? undefined : JSON.parse(selected),
                filterBy: filter
            }
        })
    }

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
                                setSelected(_.AGE_ASC);
                        }}
                        onDownClick={() => {
                                setSelected(_.AGE_DSC);
                        }}
                    />
                    <Chip
                        label="Location"
                        isUpActive={selected === _.LOCATION_ASC}
                        isDownActive={selected === _.LOCATION_DSC}
                        onUpClick={() => {
                                setSelected(_.LOCATION_ASC);
                        }}
                        onDownClick={() => {
                                setSelected(_.LOCATION_DSC);
                        }}
                    />
                    <Chip
                        label="Fame Rating"
                        isUpActive={selected === _.F_RATING_ASC}
                        isDownActive={selected === _.F_RATING_DSC}
                        onUpClick={() => {
                                setSelected(_.F_RATING_ASC);
                        }}
                        onDownClick={() => {
                                setSelected(_.F_RATING_DSC);
                        }}
                    />
                    <Chip
                        label="Common Tags"
                        isUpActive={selected === _.TAGS_ASC}
                        isDownActive={selected === _.TAGS_DSC}
                        onUpClick={() => {
                                setSelected(_.TAGS_ASC);
                        }}
                        onDownClick={() => {
                                setSelected(_.TAGS_DSC);
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
                                max={6}
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
                            className={button}
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