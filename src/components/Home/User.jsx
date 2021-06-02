import {
    Avatar,
    CardActionArea,
    Container,
    Divider,
    makeStyles,
    Typography
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        width: "500px",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    flexCenter: {
        display: "flex",
        alignItems: "center"
    },
    mRight: {
        marginLeft: theme.spacing(7)
    },
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const User = ({

}) => {
    const classes = useStyles();

    return (
        <>
        <Divider />
        <CardActionArea>
            <Container className={classes.container}>
                <div className={classes.flexCenter}>
                    <Avatar
                        className={classes.avatar}
                    />
                    <h6>Ayman Elamrani</h6>
                </div>
                <div className={classes.mRight}>
                    <Typography color="textSecondary" variant="body2">
                        biography
                    </Typography>
                </div>
            </Container>
        </CardActionArea>
        </>
    )
}

export default User;