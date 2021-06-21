import React, { useState, useEffect } from 'react'
import { Card, CardContent, Dialog, DialogContent, Button, makeStyles, DialogActions, Avatar, Fab } from '@material-ui/core';
import { Add, Camera, CameraAlt, Delete, Edit } from '@material-ui/icons'
import client from '../../client'
import ConfirmDelete from './ConfirmDelete'
import { useQuery } from '@apollo/client';
import { GET_PICTURES } from '../../GraphQl/User/Queries';

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
    var classes = useStyles();

    var deletePicture = () => {
        client
            .post('/user/picture', {
                picture: img
            })
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                if (err)
                    console.error(err);
            })
    }

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
                        src={img}
                        className={classes.preImg}
                    />
                </div>
                <ConfirmDelete
                    open={openDeleteDialog}
                    setOpen={setValue}
                    text="Do you want to delete this picture ?"
                    handleDelete={deletePicture}
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
    const { data, loading } = useQuery(GET_PICTURES, {
        onError: (err) => {
            console.error(err);
        }
    });

    useEffect(() => {
        if (!loading)
            setPictures(data.getUser.regulatPictures);
    }, [data]);

    return (
        <div className="images-group">
                {
                    pictures && pictures.length > 0 ? ( <ul>
                    {pictures.map((picture) => (
                        <li
                            key={picture}
                        >
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                    setImage(picture);
                                }}
                            >
                                <Avatar
                                    src={picture}
                                    className={classes.avatar}
                                />
                            </Button>
                        </li>
                    ))} </ul>) : (
                        <div className="noImgs">
                            <CameraAlt color="disabled" />
                            <p className="noImgs-text">
                                No Images Found
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
                <Fab>
                    <Add />
                    <input
                        accept="image/*"
                        type="file"
                        id="epicture"
                        
                    />
                </Fab>
            </div>
        </div>
    )
}

export default Pictures;