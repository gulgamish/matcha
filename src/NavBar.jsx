import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import { useUserContext } from './user.wrapper'
import client from './client'
import img from './img/profile-photo.png'
import 'font-awesome/css/font-awesome.min.css'
import { Avatar, Button, Chip, Divider, Fab, List, ListItemIcon, makeStyles, MenuItem, MenuList, Typography } from '@material-ui/core'
import { ChatBubble, ExitToApp, MeetingRoom, Notifications, Person } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USERNAME } from './GraphQl/User/Queries'
import Menu from './sub-components/menu-dropdown/Menu'

var useStyles = makeStyles({
    logOut: {
        boxShadow: "none",
        backgroundColor: "white",
        width: "40px",
        height: "40px"
    },
    navLinkProfile: {
        marginRight: "10px"
    }
})

export default function(props) {
    var { user, setUser } = useUserContext();
    var [ image, setImage ] = useState();
    var classes = useStyles();
    var history = useHistory();
    const { data, loading, error } = useQuery(GET_USERNAME);

    if (!loading)
        console.log(data);

    function signOut() {
        client
            .post('/user/logout')
            .catch(err => {
                if (err)
                    console.error(err);
            })
            .finally(() => {
                setUser({ isLoggedIn: false, token: '' });
                history.push("/");
            })
    }

    return (
        <div id="navbar">
            <div className="app">
                <a href="/home" className="app-name">
                    matcha
                </a>
            </div>
            {(user.isLoggedIn) ? (
                <div className="profile-nav">
                    <Menu
                        nav={<Chip
                            clickable={true}
                            variant="outlined"
                            avatar={<Avatar src={image} />}
                            className="menu-header"
                        />}
                        subNavs={
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        history.push('/profile')
                                    }}
                                >
                                    <ListItemIcon>
                                        <Person fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">
                                        profile
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        history.push("/messenger")
                                    }}
                                >
                                    <ListItemIcon>
                                        <ChatBubble fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">
                                        messages
                                    </Typography>
                                </MenuItem>
                                <Divider style={{
                                    margin: "5px"
                                }} />
                                <MenuItem>
                                    <ListItemIcon>
                                        <ExitToApp fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">
                                        sign out
                                    </Typography>
                                </MenuItem>
                            </MenuList>
                        }
                    />
                </div>
            ) : (
                <div className="profile-nav">
                    <NavLink
                        to="/"
                        className="navLink"
                    >
                        <Button>
                            Sign in
                        </Button>
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="navLink"
                    >
                        <Button>
                            Sign up
                        </Button>
                    </NavLink>
                </div>
            )}
        </div>
    )
}