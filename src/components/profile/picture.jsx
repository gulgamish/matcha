import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Avatar, Button, CardActions, Fab } from '@material-ui/core'
import img from '../../img/profile-photo.png'
import Pictures from './Pictures'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROFILE_PICTURE } from '../../GraphQl/User/Queries'
import "./style.css"
import { UPLOAD } from '../../GraphQl/User/Mutations'
import useAlert from "../tools/useAlert"

var useStyles = makeStyles({
    importButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white'
    },
    deleteProfilePicture: {
        position: 'absolute',
        bottom: 0,
        right: '20%'
    },
    profilePic: {
        width: '200px',
        height: '200px',
        margin: 'auto'
    }
})

var Picture = (props) => {
    var classes = useStyles();
    var [ open, setOpen ] = useState(false);
    const { SnackBar, setAlert } = useAlert();
    var [ profilePic, setProfilePic ] = useState(img);
    const { data, loading, error } = useQuery(GET_PROFILE_PICTURE);
    const [ uploadFile ] = useMutation(UPLOAD, {
        onCompleted: (data) => {
            setAlert({
                open: true,
                isSucces: true,
                msg: "Picture uploaded successfuly"
            });
            setProfilePic(data.uploadFile.url);
        },
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: "Error, please try again"
            })
        }
    })

    useEffect(() => {
        if (!loading)
            setProfilePic(data.getUser.profilePicture)
    }, [data]);

    return (
        <Card>
            <CardContent>
                <div className="img-container">
                    <Avatar src={profilePic} className={classes.profilePic} />
                    <div className="edit-picture">
                        <input
                            accept="image/*"
                            type="file"
                            id="epicture"
                            onChange={({ target: { validity, files: [file] } }) => {
                                if (validity.valid) {
                                    uploadFile({
                                        variables: {
                                            type: "profile",
                                            file
                                        }
                                    })
                                }
                            }}
                        />
                        <label htmlFor="epicture">Edit picture</label>
                    </div>
                </div>
                <Pictures />
            </CardContent>
            <SnackBar />
        </Card>
    )
}

export default Picture;