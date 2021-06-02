import React, { useState } from 'react';
import img from '../../img/dating.jpg'
import Login from './login'
import Register from './register'

const Authentification = ({ location }) => {
    var { pathname } = location;

    if (pathname == '/')
        return <Login />;
    return <Register />;
}

export default function(props) {
    
    return (
        <div id="form-container">
            <div id="login-card">
                <Authentification location={props.location} />
            </div>
        </div>
    )
}