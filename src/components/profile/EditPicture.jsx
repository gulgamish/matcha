import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles'
import { CloudUpload, PhotoCamera } from '@material-ui/icons/'
import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup } from '@material-ui/core'
import client from '../../client'
import { useMutation } from '@apollo/client'
import { UPLOAD } from '../../GraphQl/User/Mutations'

var choix = {
    "profilePicture": 1,
    "picture": 2
}

var useStyles = makeStyles({
    title: {
        margin: 'auto'
    },
    uploadButton: {
        color: 'white'
    },
    previewImg: {
        width: '290px',
        height: '290px',
        borderRadius: '0',
        margin: '1px 0 0 1px'
    }
})

var EditPicture = (props) => {
    var [ img, setImg ] = useState(null);
    var [ image, setImage ] = useState(null);
    var [ choice, setChoice ] = useState("profile");
    var [ fetching, setFetching ] = useState(false);
    const [ uploadFile ] = useMutation(UPLOAD, {
        onCompleted: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.error(err);
        }
    })
    var { open, handleClose } = props;
    var classes = useStyles();

    var handleImageEvent = (e) => {
        const file = e.target.files[0];
        uploadFile({
            variables: {
                file
            }
        })
        setImage(e.target.files[0]);
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState == 2) {
                setImg(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    var handleFileUpload = (e) => {
        var route = "";

        if (image != null) {
            if (choice == choix.profilePicture)
                route = "/user/picture/profile";
            else
                route = "/user/picture";
            var formData = new FormData();
            formData.append("picture", image);
            setFetching(true);
            client
                .put(route, formData, {
                    headers: {
                        'Content-type': 'form-data'
                    }
                })
                .then(() => {
                    setFetching(false);
                    window.location.reload();
                })
                .catch(err => {
                    if (err)
                        console.error(err);
                })
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                <div className="title">
                    <span>upload your image</span>
                </div>
            </DialogTitle>
            <Divider />
            <DialogContent className="dialog-content">
                <div className="dialog-container">
                    <div className="display-image-container">
                        <div className="display-image">
                            <Avatar
                                src={img}
                                className={classes.previewImg}
                            />
                            <div className="upload-image">
                                <input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={({ target: { validity, files: [file] } }) => {
                                        if (validity.valid) {
                                            uploadFile({
                                                variables: {
                                                    type: choice,
                                                    file
                                                }
                                            })
                                        }
                                    }}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span" 
                                    >
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="choice-upload">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Upload AS</FormLabel>
                            <RadioGroup
                                value={choice}
                                onChange={e => {
                                    setChoice(e.target.value);
                                }}
                            >
                                <FormControlLabel value="profile" control={<Radio />} label="Profile picture" />
                                <FormControlLabel value="regular" control={<Radio />} label="Regular picture" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </DialogContent>
            <Divider />
            <DialogActions>
                <div className="close-button-wrapper">
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                    >
                        CLOSE
                    </Button>
                </div>
                <div className="upload-button-wrapper">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUpload />}
                        className="upload-button"
                        onClick={handleFileUpload}
                    >
                        {fetching ? (
                            <CircularProgress className={classes.uploadButton} />

                        ) : (
                            "Upload"
                        )}                     
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default EditPicture;