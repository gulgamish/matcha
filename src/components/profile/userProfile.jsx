import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import client from '../../client'
import Picture from './picture'
import Info from './info'
import Location from './location'
import { useQuery } from '@apollo/client'


export default function(props) {
    
    return (
        <div className="profile">
            <div className="side-bar">
                <Picture />
                <Location />
            </div>
            <div className="user-info">
                <Info />
            </div>
        </div>
    )
}