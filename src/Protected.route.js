import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useUserContext } from './user.wrapper';

export default function({ component: Component, ...rest }) {
    var { user } = useUserContext();

    return (
        <Route {...rest} render={(props) => {
            if (user.isLoggedIn)
                return <Component {...props} />
            else
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }}/>
    )
}