import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "./user.wrapper";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [isCompleted, setIsCompleted] = useState(true);
    var { user, setUser } = useUserContext();

    useEffect(() => {
        axios
            .post(
                "/graphql",
                {
                    query: `
                        query checkIfComplete {
                            checkIfComplete
                        }
                    `
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            )
            .then(({ data }) => data.data.checkIfComplete)
            .then(isComplete => {
                setIsCompleted(isComplete);
                if (!isComplete)
                    setUser({
                        ...user,
                        errorMessage: "Please complete your profile informations"
                    })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route
            {...rest}
            render={(props) => {
                if (user.isLoggedIn) {
                    if (isCompleted || props.location.pathname === "/profile") {
                        return <Component {...props} />;
                    }
                    else {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/profile",
                                    state: { from: props.location }
                                }}
                            />
                        );
                    }
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
