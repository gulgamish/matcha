import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles'
import { Delete, Edit } from '@material-ui/icons/'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Avatar, Button, CardActions, Fab } from '@material-ui/core'
import client from '../../client'
import EditPicture from './EditPicture'
import img from '../../img/profile-photo.png'
import Pictures from './Pictures'

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
    var [ profilePic, setProfilePic ] = useState(img);

    useEffect(() => {
        client
            .get('/user/picture/profile')
            .then(({ data }) => {
                if (data.picture != "none") {
                    setProfilePic(data.picture)
                }
            })
            .catch(err => {
                if (err)
                    console.error(err);
            })
    }, []);

    return (
        <Card>
            <CardContent>
                <div className="img-container">
                    <Avatar src={profilePic} className={classes.profilePic} />
                </div>
                <Pictures />
                <EditPicture
                    open={open}
                    handleClose={() => {
                        setOpen(false);
                    }}
                />
            </CardContent>
            <CardActions>
                <Button
                    startIcon={<Edit />}
                    variant="contained"
                    className={classes.importButton}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    import a photo
                </Button>
            </CardActions>
        </Card>
    )
}

export default Picture;