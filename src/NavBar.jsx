import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import { useUserContext } from './user.wrapper'
import client from './client'
import img from './img/profile-photo.png'
import 'font-awesome/css/font-awesome.min.css'
import { Avatar, Button, Chip, Divider, Fab, List, ListItemIcon, makeStyles, MenuItem, MenuList, Typography } from '@material-ui/core'
import { ChatBubble, ExitToApp, MeetingRoom, Person } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USERNAME, GET_USERNAME_PICTURE } from './GraphQl/User/Queries'
import Menu from './sub-components/menu-dropdown/Menu'
import Notifications from './components/Notifications/Notifications'
import { SIGN_OUT } from './GraphQl/User/Mutations'

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
    var { user } = useUserContext();
    var history = useHistory();
    const { data, loading } = useQuery(GET_USERNAME_PICTURE);
    const [ signOut ] = useMutation(SIGN_OUT, {
        onCompleted: (data) => {
            window.location.reload();
        }
    });

    return (
        <div id="navbar">
            <div className="app">
                <NavLink
                    to="/home"
                    className="navLink"
                >
                    matcha
                </NavLink>
            </div>
            {(user.isLoggedIn) ? (
                <div className="profile-nav">
                    <Notifications />
                    <Menu
                        nav={<Chip
                            clickable={true}
                            variant="outlined"
                            avatar={<Avatar src={!loading ? data.getUser.profilePicture : null} />}
                            label={!loading ? data.getUser.username : null}
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
                                <MenuItem
                                    onClick={() => {
                                        signOut();
                                    }}
                                >
                                    <ListItemIcon>
                                        <ExitToApp fontSize="small" color="secondary" />
                                    </ListItemIcon>
                                    <Typography variant="inherit" color="secondary">
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