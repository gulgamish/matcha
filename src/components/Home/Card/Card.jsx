import React, { useState } from 'react'
import "./Style.css"
import img from "../../../img/profile-photo.png"
import 'font-awesome/css/font-awesome.min.css';
import { Chip, Fab, makeStyles } from '@material-ui/core';
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router-dom"

var useStyles = makeStyles({
    root: {
        padding: "5px",
        margin: "3px"
    }
})

const Card = ({
    id,
    image = img,
    firstName,
    lastName,
    age,
    distance,
    interests,
    fameRating
}) => {
    const [toggle, setToggle] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    return (
        <div
            className="card"
            onClick={() => {
                history.push(`/user/profile/${id}`)
            }}
        >
            <div className="header">
                <div className="overlay">
                </div>
                <div className="media">
                    <img
                        className="media-avatar"
                        src={image}
                    />
                </div>
            </div>
            <div className="content">
                <div className="info">
                    <div className="label">
                        <i className="fullname">{firstName} {lastName}, {age}</i>
                    </div>
                </div>
                <div className="info">
                    <div className="align">
                        <div className="icon">
                            <i className="fa fa-map-marker"></i>
                        </div>
                        <div className="label">
                            <i className="side-info-label">{distance} km</i>
                        </div>
                    </div>
                </div>
                <div className="info">
                    <ul>
                        {interests.map(item => (
                            <li>
                                <Chip
                                    label={item}
                                    variant="outlined"
                                    className={classes.root}
                                    key={item}
                                    color="primary"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Card;