import {
    Avatar,
    CardActionArea,
    Chip,
    Container,
    Divider,
    Fab,
    LinearProgress,
    makeStyles,
    Typography
} from '@material-ui/core'
import React from 'react'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { FavoriteBorder } from '@material-ui/icons';
import "bootstrap/dist/css/bootstrap.min.css"
import ProgressBar from "react-bootstrap/ProgressBar"

const useStyles = makeStyles((theme) => ({
    container: {
        width: "500px",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        position: "relative"
    },
    flexCenter: {
        display: "flex",
        alignItems: "center"
    },
    mLeft: {
        marginRight: theme.spacing(1)
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    likeBtn: {
        position: "absolute",
        right: "0px",
        top: "0px",
        zIndex: "2"
    },
    align: {
        marginLeft: theme.spacing(7),
        marginTop: theme.spacing(1)
    },
    list: {
        display: "inline"
    },
    tag: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    progressBar: {
        width: "60px",
        height: "4px"
    }
}));

const User = ({
    gender
}) => {
    const classes = useStyles();

    return (
        <>
        
        <Divider />
        <div className={classes.container}>
            <CardActionArea>
                <Container>
                    <div className={classes.flexCenter}>
                        <Avatar
                            className={classes.avatar}
                        />
                        <div>
                            <h6>Ayman Elamrani</h6>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                                className={classes.flexCenter}
                            >
                                <div className={classes.mLeft}>
                                    <i className="fa fa-male"></i>
                                </div>
                                <div className={classes.mLeft}>
                                    Male
                                </div>
                                <div className={classes.mLeft}>
                                    -
                                </div>
                                <div className={classes.mLeft}>
                                    Fame Rating: 
                                </div>
                                    
                                <div className={classes.mLeft}>
                                <ProgressBar now={10} animated className={classes.progressBar} />
                                </div>
                                <div className={classes.mLeft}>
                                    -
                                </div>
                                <div className={classes.mLeft}>
                                    <i className="fa fa-map-marker"></i>
                                </div>
                                <div className={classes.mLeft}>
                                    10 km
                                </div>
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.align}>
                        <ul
                            style={{
                                display: "inline"
                            }}
                        >
                            {
                                ["vegan", "geek", "geek", "geek", "geek", "geek", "geek", "geek"].map(item => (
                                    <li>
                                        <Chip
                                            label={item}
                                            variant="outlined"
                                            color="primary"
                                            className={classes.tag}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Container>
            </CardActionArea>
            <div className={classes.likeBtn}>
                <Fab size="medium">
                    <FavoriteBorder />
                </Fab>
            </div>
        </div>
        </>
    )
}

export default User;