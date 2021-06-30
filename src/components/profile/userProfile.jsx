import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import client from '../../client'
import Picture from './picture'
import Info from './info'
import Location from './location'
import { useQuery } from '@apollo/client'
import { useUserContext } from '../../user.wrapper'
import useAlert from '../tools/useAlert'


export default function(props) {
    const { user } = useUserContext();
    const { SnackBar, setAlert } = useAlert();

    useEffect(() => {
        if (user.errorMessage)
            setAlert({
                open: true,
                isError: true,
                msg: user.errorMessage
            })
    }, []);
    
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