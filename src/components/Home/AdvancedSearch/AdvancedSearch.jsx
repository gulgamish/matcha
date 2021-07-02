import { useLazyQuery } from "@apollo/client"
import { Dialog, Fab, Typography, Slider, DialogTitle, Button } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import React, { useEffect, useState } from "react"
import { USERS_SORTED_FILTRED } from "../../../GraphQl/Match/Queries"
import InputTags from "../../../sub-components/InputTag/InputTag"
import "./style.css"

const SearchDialog = ({
    search,
    setSearch,
    open,
    handleClose,
    onSearch
}) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                advanced search
            </DialogTitle>
            <div className="s-container">
                <div className="search-input-wrapper">
                    <Typography id="track-inverted-range-slider" gutterBottom>
                        Age
                    </Typography>
                    <Slider
                        aria-labelledby="track-inverted-range-slider"
                        onChange={(e, newv) => {
                            setSearch({
                                ...search,
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
                <div className="search-input-wrapper">
                    <Typography id="track-inverted-range-slider" gutterBottom>
                        Distance
                    </Typography>
                    <Slider
                        aria-labelledby="track-inverted-range-slider"
                        onChange={(e, newv) => {
                            setSearch({
                                ...search,
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
                <div className="search-input-wrapper">
                    <Typography gutterBottom>
                        Fame Rating
                    </Typography>
                    <Slider
                        onChange={(e, newv) => {
                            setSearch({
                                ...search,
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
                <div className="search-input-wrapper">
                    <Typography>
                        Common tags
                    </Typography>
                    <InputTags
                        onChange={(tag) => {
                            setSearch({
                                ...search,
                                interests: [
                                    ...search.interests,
                                    tag
                                ]
                            })
                        }}
                    />
                </div>
                <div className="search-button">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={onSearch}
                    >
                        search
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

const AdvancedSearch = ({
    setUsers
}) => {
    const [ search, setSearch ] = useState({
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
    const [ open, setOpen ] = useState(false);
    const [ browse, { loading, data } ] = useLazyQuery(USERS_SORTED_FILTRED);

    useEffect(() => {
        if (!loading && data && data.browseUsers) {
            setUsers(data.browseUsers);
        }
    }, [data]);

    const onSearch = () => {
        browse({
            variables: {
                filterBy: search
            }
        });
        setOpen(false);
    }


    return (
        <div className="as-container">
            <Fab
                color="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <Search />
            </Fab>
            <SearchDialog
                search={search}
                setSearch={setSearch}
                open={open}
                handleClose={() => {
                    setOpen(false)
                }}
                onSearch={onSearch}
            />
        </div>
    )
}

export default AdvancedSearch;