import React, { useEffect } from 'react'

const useGetLocation = ({ setLocation }) => {

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coords: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }

    const onError = (error) => {
        if (error)
            console.log(error);
    }

    useEffect(() => {
        if (("geolocation" in navigator)) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        }
    }, [])
}

export default useGetLocation;