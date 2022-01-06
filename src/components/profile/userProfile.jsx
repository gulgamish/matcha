import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Picture from './picture'
import Info from './info'
import Location from './location'
import { useUserContext } from '../../user.wrapper'
import useAlert from '../tools/useAlert'


const UserProfile = (props) => {
    const { user } = useUserContext();
    const { SnackBar, setAlert } = useAlert();

    useEffect(() => {
        if (user.errorMessage)
            setAlert({
                open: true,
                isError: true,
                msg: user.errorMessage
            })
    }, [ user.errorMessage, setAlert ]);
    
    return (
        <div className="profile">
            <div className="side-bar">
                <Picture />
                <Location />
            </div>
            <div className="user-info">
                <Info />
            </div>
            <SnackBar />
        </div>
    )
}

export default UserProfile;