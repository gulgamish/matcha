import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Avatar, CircularProgress } from '@material-ui/core'
import img from '../../img/profile-photo.png'
import Pictures from './Pictures'
import { useMutation, useQuery } from '@apollo/client'
import { GET_LIKES, GET_PROFILE_PICTURE, GET_VIEWS } from '../../GraphQl/User/Queries'
import "./style.css"
import { UPLOAD } from '../../GraphQl/User/Mutations'
import useAlert from "../tools/useAlert"
import { Visibility, FavoriteBorder } from "@material-ui/icons"
import { Who } from './Who'

var baseURL = process.env.REACT_APP_BASE_URL;

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
    const { SnackBar, setAlert } = useAlert();
    var [ profilePic, setProfilePic ] = useState(img);
    const [ who, setWho ] = useState({
        open: false,
        title: "",
        users: []
    });
    const { data, loading } = useQuery(GET_PROFILE_PICTURE);
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
                msg: err.message
            })
        }
    });
    const { data: dataViews, loading: loadingViews } = useQuery(GET_VIEWS, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            })
        }
    });
    const { data: dataLikes, loading: loadingLikes } = useQuery(GET_LIKES, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            })
        }
    })

    useEffect(() => {
        if (!loading)
            setProfilePic(data.getUser.profilePicture)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <Card>
            <Who open={who.open} setWho={setWho} title={who.title} users={who.users} />
            <CardContent>
                <div className="img-container">
                    <Avatar src={`http://${baseURL}${profilePic}`} className={classes.profilePic} />
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
                    <div className="ana">
                        <div className="views" onClick={() => {
                            setWho((value) => {
                                return {
                                    open: true,
                                    title: "Views",
                                    users: dataViews.getWhoLooked
                                }
                            })
                        }}>
                            {loadingViews ? (
                                <CircularProgress size="20px" />
                            ) : (
                                <span>{dataViews.getWhoLooked.length}</span>
                            )}
                            <Visibility fontSize="small" />
                        </div>
                        <div className="likes" onClick={() => {
                            setWho((value) => {
                                return {
                                    open: true,
                                    title: "Likes",
                                    users: dataLikes.getWhoLiked
                                }
                            })
                        }}>
                            {loadingLikes ? (
                                <CircularProgress size="20px" />
                            ) : (
                                <span>{dataLikes.getWhoLiked.length}</span>
                            )}
                            <FavoriteBorder fontSize="small" />
                        </div>
                    </div>
                </div>
                <Pictures />
            </CardContent>
            <SnackBar />
        </Card>
    )
}

export default Picture;