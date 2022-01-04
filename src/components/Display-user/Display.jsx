import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Button, Chip, CircularProgress, Dialog, DialogActions, LinearProgress, makeStyles } from "@material-ui/core";
import { Block, Flag, FlagOutlined, LocationOn, Report } from "@material-ui/icons";
import React, { useEffect, useState } from "react"
import Heart from "react-heart"
import { BLOCK, LIKE, REPORT, UNLIKE } from "../../GraphQl/Match/Mutations";
import { GET_USER } from "../../GraphQl/Match/Queries";
import { NEW_LAST_SEEN } from "../../GraphQl/Match/Subscriptions";
import Confirm from "../profile/Confirm";
import useAlert from "../tools/useAlert";
import { useCallback } from "react";
import moment from "moment"
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
    data,
    loading,
}) => {
    var [ image, setImage ] = useState();
    const { SnackBar, setAlert } = useAlert();
    const [ isHeartActive, setHeart ] = useState(false);
    const [ openBlockDialog, setOpenBlockDialog ] = useState(false);
    const [ openReportDialog, setOpenReportDialog ] = useState(false);
    const [ lastSeen, setLastSeen ] = useState(null);
    const [ status, setStatus ] = useState("");
    const updateLastSeen = useCallback(() => {
        if(lastSeen && (new Date().getTime() - new Date(lastSeen).getTime()) / 1000 > 20)
            setStatus(`last seen: ${moment(data.lastSeen).format("DD MMMM YYYY HH:mm")}`);
    }, [ lastSeen, setLastSeen ]);
    const [ like ] = useMutation(LIKE, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            });
            handleClose();
        }
    });
    const [ unlike ] = useMutation(UNLIKE, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            });
            handleClose();
        }
    })
    const [ blockUser ] = useMutation(BLOCK, {
        onCompleted: (data) => {
            window.location.reload();
        },
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            });
            handleClose();
        }
    })
    const [ reportUser ] = useMutation(REPORT, {
        onCompleted: (data) => {
            setOpenReportDialog(false);
            handleClose();
        },
        onError: (err) => {
            setOpenReportDialog(false);
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            });
            //handleClose();
        }
    })
    const { data: dataNewLastSeen, loading: loadingNewLastSeen } = useSubscription(NEW_LAST_SEEN);
    const classes = useStyles();

    useEffect(() => {
        if (!loading && data) {
            setImage(data.profilePicture);
            setHeart(data.liked);
            if((new Date().getTime() - new Date(data.lastSeen).getTime()) / 1000 < 20)
                setStatus(`online`);
            else
                setStatus(`last seen: ${moment(data.lastSeen).format("DD MMMM YYYY HH:mm")}`);
        }
    }, [data, loading])

    useEffect(() => {
        if (!loadingNewLastSeen && dataNewLastSeen && data) {
            if (dataNewLastSeen.newLastSeen.id === data.id) {
                if ((new Date().getTime() - new Date(dataNewLastSeen.newLastSeen.last_seen).getTime()) / 1000 < 20) {
                    setStatus("online")
                    setLastSeen(dataNewLastSeen.newLastSeen.last_seen);
                }
            }
        }
    }, [ dataNewLastSeen, loadingNewLastSeen ]);

    useEffect(() => {
        var timer = setInterval(updateLastSeen, 10000);

        return () => clearInterval(timer);
    }, [ lastSeen ])

    if (loading)
        return <Dialog open={open} onClose={handleClose}>
            <div className="charging">
                <CircularProgress />
            </div>
        </Dialog>

    if (!data)
        return null;
    const user = data;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
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
                                    setImage(user?.profilePicture);
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
                    <div className="name-username-status">
                        <div className="name-username">
                            <div className="name">
                                {user.firstName} {user.lastName}
                            </div>
                            <div className="username">
                                [{user.username}]
                            </div>
                        </div>
                        <div className="status">
                            {status}
                        </div>
                    </div>
                    <Information
                        label="Fame Rating"
                        content={
                            <>
                                <div className="progress-number">
                                    {user.score / 10} %
                                </div>
                                <div className="progress-bar">
                                    <LinearProgress value={user.score / 10} variant="determinate" />
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
                                    id: data.id
                                }
                            });
                            setHeart(true);
                        }
                        else if (isHeartActive) {
                            unlike({
                                variables: {
                                    id: data.id
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
                                id: data.id
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
                                id: data.id
                            }
                        })
                    }}
                />
            </DialogActions>
            <SnackBar />
        </Dialog>
    )
}

export default Display;