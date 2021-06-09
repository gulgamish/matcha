import React, { useState } from 'react'
import {
    Button,
    Divider, Slider, Typography
} from "@material-ui/core"
import Chip from "../Chip/Chip"
import InputTags from "../InputTag/InputTag"
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
                    <div className="filter-controllers">
                        <div className="filter-wrapper">
                            <Typography id="track-inverted-range-slider" gutterBottom>
                                Age
                            </Typography>
                            <Slider
                                aria-labelledby="track-inverted-range-slider"
                                onChange={(e, newv) => {
                                    console.log(newv);
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
                            <Typography gutterBottom>
                                Distance
                            </Typography>
                            <Slider
                                onChange={(e, newv) => {
                                    console.log(newv);
                                }}
                                defaultValue={0}
                                valueLabelDisplay="auto"
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
                                    console.log(newv);
                                }}
                                defaultValue={0}
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
                                    console.log(tag);
                                }}
                            />
                        </div>
                    </div>
                    <div className="filter-button">
                        <Button
                            variant="outlined"
                            color="primary"
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