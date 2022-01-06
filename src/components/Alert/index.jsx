import { useUserContext } from "../../user.wrapper";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert as AlertC } from "@material-ui/lab"

const Alert = (props) => {
    const { user } = useUserContext();
    const [ loading, setLoading ] = useState(true);
    const [ isComplete, setIsComplete ] = useState(null);

    useEffect(() => {
        if (user.isLoggedIn) {
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
                    setIsComplete(isComplete);
                })
                .finally(() => setLoading(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!loading && isComplete !== null)
        return (
            <div>
                {!isComplete && (
                    <AlertC severity="error">Please Complete your profile informations</AlertC>
                )}
            </div>
        )
    return null;
}

export default Alert;