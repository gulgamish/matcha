import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import { useUserContext } from './user.wrapper'
import 'font-awesome/css/font-awesome.min.css'
import { Avatar, Button, Chip, Divider, ListItemIcon, MenuItem, MenuList, Typography } from '@material-ui/core'
import { ChatBubble, ExitToApp, Person } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'
import { GET_USERNAME_PICTURE } from './GraphQl/User/Queries'
import Menu from './sub-components/menu-dropdown/Menu'
import Notifications from './components/Notifications/Notifications'
import { SIGN_OUT } from './GraphQl/User/Mutations'

const NavBar = () => {
    var { user } = useUserContext();
    var history = useHistory();
    const [ getUsername, { data, loading } ] = useLazyQuery(GET_USERNAME_PICTURE);
    const [ signOut ] = useMutation(SIGN_OUT, {
        onCompleted: (data) => {
            window.localStorage.removeItem("token");
            window.location.reload();
        }
    });

    useEffect(() => {
        if (user.isLoggedIn) {
            getUsername();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.isLoggedIn]);

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
                            avatar={<Avatar src={!loading ? data?.getUser.profilePicture : null} />}
                            label={!loading ? data?.getUser.username : null}
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

export default NavBar;