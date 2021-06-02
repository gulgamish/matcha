import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { useUserContext } from './user.wrapper'

export default function({ component: Component, ...rest }) {
    var { user } = useUserContext();

    return (
        <Route {...rest} render={(props) => {
            if (user.isLoggedIn)
                return <Redirect to="/home" />
            else
                return <Component {...props} />
        }} />
    )
}