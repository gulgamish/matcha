import React, { useState } from 'react'
import { Dialog, DialogContent, Button, makeStyles, DialogActions, Avatar, IconButton } from '@material-ui/core';
import { CameraAlt, Delete, PhotoCamera } from '@material-ui/icons'
import Confirm from './Confirm'
import { useMutation, useQuery } from '@apollo/client';
import { GET_PICTURES } from '../../GraphQl/User/Queries';
import { DELETE_PICTURE, UPLOAD } from "../../GraphQl/User/Mutations"
import useAlert from "../tools/useAlert"

var baseURL = process.env.REACT_APP_BASE_URL;

var useStyles = makeStyles({
    image: {
        width: '100px',
        height: '100px'
    },
    preImg: {
        width: '350px',
        height: '350px',
        margin: 'auto',
        borderRadius: '0'
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '0'
    }
})

var DisplayImage = ({ open, setOpen, img }) => {
    var [ openDeleteDialog, setValue ] = useState(false);
    const [ deletePicture ] = useMutation(DELETE_PICTURE, {
        onCompleted: (data) => {
            if (data.deletePicture)
                window.location.reload();
        }
    })
    var classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
            }}
        >
            <DialogContent>
                <div className="preview-image">
                    <Avatar
                        src={`http://${baseURL}${img}`}
                        className={classes.preImg}
                    />
                </div>
                <Confirm
                    title="Delete picture"
                    open={openDeleteDialog}
                    setOpen={setValue}
                    text="Do you want to delete this picture ?"
                    handle={() => {
                        deletePicture({
                            variables: {
                                url: img,
                                type: "regular"
                            }
                        })
                        setOpen(false);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete  />}
                    onClick={() => {
                        setValue(true);
                    }}
                >
                    delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

var Pictures = () => {
    var [ open, setOpen ] = useState(false);
    var [ pictures, setPictures ] = useState([]);
    var [ image, setImage ] = useState("");
    var classes = useStyles();
    const { SnackBar, setAlert } = useAlert();
    useQuery(GET_PICTURES, {
        onCompleted: (data) => {
            if (data.getUser.regularPictures)
                setPictures(data.getUser.regularPictures);
        },
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            })
        }
    });
    const [ uploadFile ] = useMutation(UPLOAD, {
        onCompleted: (data) => {
            setPictures([
                ...pictures,
                data.uploadFile.url
            ])
        },
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            })
        }
    })

    return (
        <div className="images-group">
            {
                pictures && pictures.length > 0 ? ( <ul>
                {pictures.map((picture, index) => (
                    <li
                        key={index}
                    >
                        <Button
                            onClick={() => {
                                setOpen(true);
                                setImage(picture);
                            }}
                        >
                            <Avatar
                                src={`http://${baseURL}${picture}`}
                                className={classes.avatar}
                            />
                        </Button>
                    </li>
                ))} </ul>) : (
                    <div className="noImgs">
                        <CameraAlt color="disabled" />
                        <p className="noImgs-text">
                            Upload some images here
                        </p>
                    </div>
                )
            }
            
            <DisplayImage
                open={open}
                setOpen={setOpen}
                img={image}
            />
            <div className="edit-regular-picture">
                <input
                    accept="image/*"
                    type="file"
                    id="reg-picture"
                    style={{
                        display: "none"
                    }}
                    onChange={({ target: { validity, files: [file] } }) => {
                        if (validity.valid) {
                            uploadFile({
                                variables: {
                                    type: "regular",
                                    file
                                }
                            })
                        }
                    }}
                />
                {pictures.length < 4 && (
                    <label htmlFor="reg-picture">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                )}
            </div>
            <SnackBar />
        </div>
    )
}

export default Pictures;