import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "./user.wrapper";

const ProtectedRoute = ({ component: Component, canRedirect, ...rest }) => {
    var { user } = useUserContext();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (user.isLoggedIn) {
                    return <Component {...props} />;
                } else
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    );
            }}
        />
    );
}

export default ProtectedRoute;
