import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './NavBar'
import Auth from './components/auth/Auth'
import Home from './components/Home/home'
import ProtectedRoute from './Protected.route'
import AuthRoute from './Auth.route'
import UserWrapper from './user.wrapper'
import Profile from './components/profile/userProfile';
import Confirm from './components/auth/Confirm'
import RecoverPassword from './components/auth/RecoverPassword';
import ResetPassword from './components/auth/ResetPassword';
import Messenger from './components/messenger/messenger';
import NotFound from './components/NotFoundPage/NotFound';
import OnlineUsersWrapper from './OnlineUsersWrapper';

export default function() {

    return (
        <Router>
            <UserWrapper>
                <OnlineUsersWrapper>
                    <Navbar />
                    <hr />
                    <Switch>
                        <AuthRoute exact path={[ "/", "/register" ]} component={Auth} />
                        <AuthRoute exact path="/confirmation/:token" component={Confirm} />
                        <AuthRoute exact path="/recover" component={RecoverPassword} />
                        <AuthRoute exact path="/change-password/:token" component={ResetPassword} />
                        <ProtectedRoute exact path='/home' component={Home} />
                        <ProtectedRoute exact path='/profile' canRedirect={false} component={Profile} />
                        <ProtectedRoute exact path="/messenger" component={Messenger} />
                        <Route component={NotFound} />
                    </Switch>
                </OnlineUsersWrapper>
            </UserWrapper>
        </Router>
    )
}