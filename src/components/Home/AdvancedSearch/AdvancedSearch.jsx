import { Dialog, Fab, Typography, Slider, DialogTitle, Button } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import React, { useState } from "react"
import InputTags from "../../../sub-components/InputTag/InputTag"
import "./style.css"
import axios from "axios"
import { useUserContext } from "../../../user.wrapper"
import { Checkbox } from "@material-ui/core"

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
                    <div>
                        <Checkbox
                            value={Object.prototype.hasOwnProperty.call(search, "age")}
                            checked={Object.prototype.hasOwnProperty.call(search, "age")}
                            onChange={(e, checked) => {
                                if (checked)
                                    setSearch((value) => ({ ...value, age: { min: 18, max: 25 } }))
                                else
                                    setSearch((value) => {
                                        delete value.age
                                        return { ...value }
                                    })
                            }}
                        />
                        <Typography id="track-inverted-range-slider">
                            Age
                        </Typography>
                    </div>
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
                        valueLabelDisplay="auto"
                        min={18}
                        max={60}
                        marks={[18, 25, 40, 60].map(elem => {
                            return {
                                value: elem,
                                label: `${elem}`
                            }
                        })}
                        disabled={!Object.prototype.hasOwnProperty.call(search, "age")}
                    />
                </div>
                <div className="search-input-wrapper">
                    <div>
                        <Checkbox
                            value={Object.prototype.hasOwnProperty.call(search, "distance")}
                            checked={Object.prototype.hasOwnProperty.call(search, "distance")}
                            onChange={(e, checked) => {
                                if (checked)
                                    setSearch((value) => ({ ...value, distance: { min: 0, max: 100 } }))
                                else
                                    setSearch((value) => {
                                        delete value.distance
                                        return { ...value }
                                    })
                            }}
                        />
                        <Typography id="track-inverted-range-slider" gutterBottom>
                            Distance
                        </Typography>
                    </div>
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
                        disabled={!Object.prototype.hasOwnProperty.call(search, "distance")}
                    />
                </div>
                <div className="search-input-wrapper">
                    <div>
                        <Checkbox
                            value={Object.prototype.hasOwnProperty.call(search, "score")}
                            checked={Object.prototype.hasOwnProperty.call(search, "score")}
                            onChange={(e, checked) => {
                                if (checked)
                                    setSearch((value) => ({ ...value, score: { min: 0, max: 100 } }))
                                else
                                    setSearch((value) => {
                                        delete value.score
                                        return { ...value }
                                    })
                            }}
                        />
                        <Typography gutterBottom>
                            Fame Rating
                        </Typography>
                    </div>
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
                        disabled={!Object.prototype.hasOwnProperty.call(search, "score")}
                    />
                </div>
                <div className="search-input-wrapper">
                    <div>
                        <Checkbox
                            value={Object.prototype.hasOwnProperty.call(search, "interests")}
                            checked={Object.prototype.hasOwnProperty.call(search, "interests")}
                            onChange={(e, checked) => {
                                if (checked)
                                    setSearch((value) => ({ ...value, interests: [] }))
                                else
                                    setSearch((value) => {
                                        delete value.interests
                                        return { ...value }
                                    })
                            }}
                        />
                        <Typography>
                            Common tags
                        </Typography>
                    </div>
                    <InputTags
                        onChange={(tags) => {
                            setSearch({
                                ...search,
                                interests: tags
                            })
                        }}
                        disabled={!Object.prototype.hasOwnProperty.call(search, "interests")}
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
    const { user } = useUserContext();
    const [ search, setSearch ] = useState({});
    const [ open, setOpen ] = useState(false);

    const fetchUsers = (filterBy) => {
        axios.post('/graphql', {
          query: `
            query browse (
              $filterBy: FilterByInput
            ) {
              browseUsers (
                  filterBy: $filterBy
              ) {
                  id,
                  firstName,
                  lastName,
                  age,
                  distance,
                  interests,
                  profilePicture,
                  score
              }
            }
          `,
          variables: {
            filterBy
          }
        }, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then(({ data }) => {
          setUsers(data.data.browseUsers);
        })
        .catch(err => {})
      }

    const onSearch = () => {
        fetchUsers(search);
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