import {
    Avatar,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
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
import img from "../../img/dating.jpg"
import Card from "./Card/Card"

const User = ({
    gender
}) => {

    return (
        <div>
            <Card />
        </div>
    )
}

export default User;