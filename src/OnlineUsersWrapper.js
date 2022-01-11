import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react"
import { LAST_SEEN } from "./GraphQl/User/Mutations";
import { useUserContext } from "./user.wrapper";

const OnlineUsersWrapper = ({
    children
}) => {
    const { user } = useUserContext();
    const [ onlineIndicator, setOnlineIndicator ] = useState(0);
    const [ updateLastSeen ] = useMutation(LAST_SEEN);

    useEffect(() => {

        if (user.isLoggedIn) {
            updateLastSeen();
            setOnlineIndicator(setInterval(() => {
                updateLastSeen();
            }, 20000));

            return () => {
                clearInterval(onlineIndicator);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.isLoggedIn]);

    return (
        children
    )
}

export default OnlineUsersWrapper;