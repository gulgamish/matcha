import React from 'react';
import Login from './login'
import Register from './register'

const Authentification = ({ location }) => {
    var { pathname } = location;

    if (pathname === '/')
        return <Login />;
    return <Register />;
}
const Auth = (props) => {
    
    return (
        <div id="form-container">
            <div id="login-card">
                <Authentification location={props.location} />
            </div>
        </div>
    )
}

export default Auth;