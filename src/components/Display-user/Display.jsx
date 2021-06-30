import { useMutation, useQuery } from "@apollo/client";
import { Button, Chip, CircularProgress, Dialog, DialogActions, LinearProgress, makeStyles } from "@material-ui/core";
import { Block, Flag, FlagOutlined, LocationOn, Report } from "@material-ui/icons";
import React, { useEffect, useState } from "react"
import Heart from "react-heart"
import { BLOCK, LIKE, REPORT, UNLIKE } from "../../GraphQl/Match/Mutations";
import { GET_USER } from "../../GraphQl/Match/Queries";
import image from "../../img/dating.jpg"
import Confirm from "../profile/Confirm";
import useAlert from "../tools/useAlert";
import "./style.css"

const useStyles = makeStyles({
    root: {
        margin: "5px"
    },
    charging: {
        margin: "50px"
    },
    display: {
        width: "90%"
    }
})

const onError = (setAlert) => (err) => {
    setAlert({
        open: true,
        isError: true,
        msg: "Error: please try again"
    })
}

const Information = ({
    label,
    content
}) => (
    <div className="d-info">
        <div className="d-info-label">
            {label}
        </div>
        <div className="d-info-content">
            {content}
        </div>
    </div>
)

const Display = ({
    open,
    handleClose,
    userId
}) => {
    var [ image, setImage ] = useState();
    const { SnackBar, setAlert } = useAlert();
    const [ isHeartActive, setHeart ] = useState(false);
    const [ openBlockDialog, setOpenBlockDialog ] = useState(false);
    const [ openReportDialog, setOpenReportDialog ] = useState(false);
    const { loading, data, error } = useQuery(GET_USER, {
        variables: {
            id: userId
        }
    });
    const [ like ] = useMutation(LIKE, {
        onError: onError(setAlert)
    });
    const [ unlike ] = useMutation(UNLIKE, {
        onError: onError(setAlert)
    })
    const [ blockUser ] = useMutation(BLOCK, {
        onError: onError(setAlert)
    })
    const [ reportUser ] = useMutation(REPORT, {
        onError: onError(setAlert)
    })
    const classes = useStyles();

    useEffect(() => {
        if (!loading) {
            setImage(data.checkProfile.profilePicture);
            setHeart(data.checkProfile.liked);
        }
    }, [data])

    useEffect(() => {
        
    }, [isHeartActive]);

    if (loading)
        return <Dialog open={open} onClose={handleClose}>
            <div className="charging">
                <CircularProgress />
            </div>
        </Dialog>

    if (!data)
        return null;

    const user = data.checkProfile;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className={classes.display}
        >
            <div className="d-container">
                <div className="user-images-container">
                    <div className="image-container">
                        <img
                            src={image}
                            className="image-display"
                        />
                    </div>
                    <div className="others-image-container">
                        <div className="slide-image-container">
                            <img
                                src={user.profilePicture}
                                className="slide-image"
                                onClick={() => {
                                    setImage(user.profilePicture);
                                }}
                            />
                        </div>
                        {user.regularPictures && user.regularPictures.map(image => (
                            <div className="slide-image-container">
                                <img
                                    src={image}
                                    className="slide-image"
                                    onClick={() => {
                                        setImage(image);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="user-content">

                    <div className="name-username">
                        <div className="name">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="username">
                            [{user.username}]
                        </div>
                    </div>
                    <Information
                        label="Fame Rating"
                        content={
                            <>
                                <div className="progress-number">
                                    {user.score} %
                                </div>
                                <div className="progress-bar">
                                    <LinearProgress value={user.score} variant="determinate" />
                                </div>
                            </>
                        }
                    />
                    <Information
                        label="Distance"
                        content={`${user.distance} km`}
                    />
                    <Information
                        label="Age"
                        content={`${user.age} years old`}
                    />
                    <Information
                        label="Gender"
                        content={user.gender}
                    />
                    <Information
                        label="Sexual Orientation"
                        content={user.sexualPreference}
                    />
                    <Information
                        label="Bio"
                        content={user.biography}
                    />
                    <Information
                        label="Interests"
                        content={
                            <ul>
                                {user.interests.map(tag => (
                                    <li key={tag}>
                                        <Chip
                                            label={tag}
                                            variant="outlined"
                                            color="primary"
                                            className={classes.root}
                                        />
                                    </li>
                                ))}
                            </ul>
                        }
                    />
                </div>
            </div>
            <DialogActions>
                <Heart
                    style={{
                        width: "2rem"
                    }}
                    isActive={isHeartActive}
                    onClick={() => {
                        if (!isHeartActive) {
                            like({
                                variables: {
                                    id: userId
                                }
                            });
                            setHeart(true);
                        }
                        else if (isHeartActive) {
                            unlike({
                                variables: {
                                    id: userId
                                }
                            })
                            setHeart(false);
                        }
                    }}
                />
                <Button
                    startIcon={<Block />}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setOpenBlockDialog(true);
                    }}
                >
                    Block
                </Button>
                <Button
                    startIcon={<FlagOutlined />}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setOpenReportDialog(true);
                    }}
                >
                    Report
                </Button>
                <Confirm
                    title="Block"
                    text="Do you want to block this user ?"
                    open={openBlockDialog}
                    setOpen={setOpenBlockDialog}
                    handle={() => {
                        blockUser({
                            variables: {
                                id: userId
                            }
                        })
                    }}
                />
                <Confirm
                    title="Report"
                    text="Do you want to report this user ?"
                    open={openReportDialog}
                    setOpen={setOpenReportDialog}
                    handle={() => {
                        reportUser({
                            variables: {
                                id: userId
                            }
                        })
                    }}
                />
            </DialogActions>
        </Dialog>
    )
}

export default Display;