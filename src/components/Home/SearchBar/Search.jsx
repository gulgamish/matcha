import React, { useCallback, useEffect, useState } from 'react'
import {
    Button,
    Checkbox,
    makeStyles, Slider, Typography
} from "@material-ui/core"
import Chip from "../Chip/Chip"
import InputTags from "../../../sub-components/InputTag/InputTag"
import "./style.css"
import * as _ from "../../../Constants/sort"
import { sort } from "../tools"
import axios from 'axios'
import { useUserContext } from '../../../user.wrapper'

const useStyles = makeStyles({
    button: {
        margin: "4px"
    }
})

const Search = ({
    users,
    setUsers,
    clear,
    setClear,
}) => {
    const { user } = useUserContext();
    const [ selected, setSelected ] = useState(null);
    const [ filter, setFilter ] = useState({})
    const { button } = useStyles();

    const fetchUsers = (orderBy, filterBy) => {
        axios.post('/graphql', {
          query: `
            query browse (
              $orderBy: OrderByInput,
              $filterBy: FilterByInput
            ) {
              browseUsers (
                  orderBy: $orderBy
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
            orderBy,
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

    useEffect(() => {
        if (selected != null) {
            var arr = sort(users, selected);
            setUsers(arr);
        }
        else
            fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    useEffect(() => {
        if (clear) {
            setSelected(null);
            setFilter({});
            setClear(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ clear ])

    const filterUsers = useCallback(() => {
        var newList = [...users];
        if (Object.prototype.hasOwnProperty.call(filter, "age"))
            newList = newList.filter(elem => elem.age >= filter.age.min && elem.age <= filter.age.max);
        if (Object.prototype.hasOwnProperty.call(filter, "distance"))
            newList = newList.filter(elem => elem.distance >= filter.distance.min && elem.distance <= filter.distance.max);
        if (Object.prototype.hasOwnProperty.call(filter, "score"))
            newList = newList.filter(elem => elem.score >= filter.score.min && elem.score <= filter.score.max);
        if (Object.prototype.hasOwnProperty.call(filter, "interests") && filter?.interests.length > 0) {
            for (let i = 0; i < newList.length; i++) {
                var arr = newList[i].interests.filter((value) =>
                    filter.interests.includes(value)
                );
                if ( arr.length === 0) {
                    delete newList[i];
                }
            }
        }
        setUsers(newList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

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
                            <div>
                                <Checkbox
                                    value={Object.prototype.hasOwnProperty.call(filter, "age")}
                                    checked={Object.prototype.hasOwnProperty.call(filter, "age")}
                                    onChange={(e, checked) => {
                                        if (checked)
                                            setFilter((value) => ({ ...value, age: {min: 18, max: 25} }))
                                        else
                                            setFilter((value) => {
                                                delete value.age;
                                                return { ...value };
                                            });
                                    }}
                                />
                                <Typography id="track-inverted-range-slider">
                                    Age
                                </Typography>
                            </div>
                            <Slider
                                aria-labelledby="track-inverted-range-slider"
                                onChange={(e, newv) => {
                                    setFilter((value) => {
                                        return {
                                            ...value,
                                            age: {
                                                min: newv[0],
                                                max: newv[1]
                                            }
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
                                disabled={!Object.prototype.hasOwnProperty.call(filter, "age")}
                            />
                        </div>
                        <div className="filter-wrapper">
                            <div>
                                <Checkbox
                                    value={Object.prototype.hasOwnProperty.call(filter, "distance")}
                                    checked={Object.prototype.hasOwnProperty.call(filter, "distance")}
                                    onChange={(e, checked) => {
                                        if (checked)
                                            setFilter((value) => ({ ...value, distance: {min: 0, max: 100} }))
                                        else
                                            setFilter((value) => {
                                                delete value.distance;
                                                return { ...value };
                                            });
                                    }}
                                />
                                <Typography id="track-inverted-range-slider">
                                    Distance
                                </Typography>
                            </div>
                            <Slider
                                aria-labelledby="track-inverted-range-slider"
                                onChange={(e, newv) => {
                                    setFilter((value) => {
                                        return {
                                            ...value,
                                            distance: {
                                                min: newv[0],
                                                max: newv[1]
                                            }
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
                                disabled={!Object.prototype.hasOwnProperty.call(filter, "distance")}
                            />
                        </div>
                        <div className="filter-wrapper">
                            <div>
                                <Checkbox
                                    value={Object.prototype.hasOwnProperty.call(filter, "score")}
                                    checked={Object.prototype.hasOwnProperty.call(filter, "score")}
                                    onChange={(e, checked) => {
                                        if (checked)
                                            setFilter((value) => ({ ...value, score: {min: 0, max: 100} }))
                                        else
                                            setFilter((value) => {
                                                delete value.score;
                                                return { ...value };
                                            });
                                    }}
                                />
                                <Typography>
                                    Fame Rating
                                </Typography>
                            </div>
                            <Slider
                                onChange={(e, newv) => {
                                    setFilter((value) => {
                                        return {
                                            ...value,
                                            score: {
                                                min: newv[0],
                                                max: newv[1]
                                            }
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
                                disabled={!Object.prototype.hasOwnProperty.call(filter, "score")}
                            />
                        </div>
                        <div className="filter-wrapper">
                            <div>
                                <Checkbox
                                    value={Object.prototype.hasOwnProperty.call(filter, "interests")}
                                    checked={Object.prototype.hasOwnProperty.call(filter, "interests")}
                                    onChange={(e, checked) => {
                                        if (checked)
                                            setFilter((value) => ({ ...value, interests: [] }))
                                        else
                                            setFilter((value) => {
                                                delete value.interests;
                                                return { ...value };
                                            });
                                    }}
                                />
                                <Typography>
                                    Common tags
                                </Typography>
                            </div>
                            <InputTags
                                clear={clear}
                                max={6}
                                onChange={(tags) => {
                                    if (tags.length >= 0)
                                        setFilter((value) => {
                                            return {
                                                ...value,
                                                interests: tags
                                            }
                                        })
                                }}
                                disabled={!Object.prototype.hasOwnProperty.call(filter, "interests")}
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