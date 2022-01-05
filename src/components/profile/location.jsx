import React, { useEffect, useState } from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker
} from '@react-google-maps/api'
import { Card, CardContent, makeStyles } from '@material-ui/core';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
    ComboboxList
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { useMutation, useQuery } from '@apollo/client';
import { GET_COORD } from '../../GraphQl/User/Queries';
import { MODIFY_GEO_POSITION } from '../../GraphQl/User/Mutations';
import useAlert from '../tools/useAlert';
import axios from "axios"

const useStyles = makeStyles({
    container: {
        padding: '16px 0 16px 0'
    }
});

const libraries = ["places"];

const mapContainerStyle = {
    width: "100%",
    height: "28vh",
    margin: "0 auto"
}

const Search = ({ resolver }) => {
    var {
        ready,
        value,
        suggestions: {
            status,
            data
        },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete();

    onselect = async (address) => {
        try {
            if (typeof address === "string") {
                setValue(address, false);
                clearSuggestions();
                var results = await getGeocode({ address });
                var { lat, lng: lon } = await getLatLng(results[0]);
                resolver({
                    variables: {
                        lat,
                        lon
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="search">
            <Combobox
                onSelect={onselect}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="Enter address"
                />
                <ComboboxPopover>
                    {
                        status === "OK" && (
                            <ComboboxList>
                                {data.map(({ description }) => (
                                    <ComboboxOption
                                        key={description}
                                        value={description}
                                    />
                                ))}
                            </ComboboxList>
                        )
                    }
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

const Location = () => {
    const [ location,  setLocation ] = useState({
        loaded: false,
        coords: { lat: 33.58, lng: -7.60 }
    });
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCgoTq9s_wEgv25IRebAnlDYJmC2a2HWcY",
        libraries
    });
    const { SnackBar, setAlert } = useAlert();
    const { refetch } = useQuery(GET_COORD, {
        onCompleted: (data) => {
            setLocation({
                loaded: true,
                coords: {
                    lat: data.getUser.lat,
                    lng: data.getUser.lon
                }
            })
        },
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: "Error: please try again"
            })
        }
    });
    const [ modifyGeoLocation ] = useMutation(MODIFY_GEO_POSITION, {
        onCompleted: (data) => {
            if (data.modifyPosition) {
                refetch();
                setAlert({
                    open: true,
                    isSucces: true,
                    msg: "Success"
                })
            }
            else
                setAlert({
                    open: true,
                    isError: true,
                    msg: "Error: please try again"
                })
        },
        onError: (error) => {
            setAlert({
                open: true,
                isError: true,
                msg: error.message
            })
        }
    });
    const classes = useStyles();

    const forceGeoLocation = () => {
        axios
            .get("http://ip-api.com/json/")
            .then(({ data }) => {
                if (data.status === "success")
                    modifyGeoLocation({
                        variables: {
                            lat: data.lat,
                            lon: data.lon
                        }
                    })
            })
    }

    useEffect(() => {
        if ("geolocation" in navigator && location.loaded && location.coords.lat === 0 && location.coords.lng === 0) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    modifyGeoLocation({
                        variables: {
                            lat: location.coords.latitude,
                            lon: location.coords.longitude
                        }
                    });
                },
                (error) => {
                    if (error.message === "User denied Geolocation") {
                        forceGeoLocation();
                    }
                }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <Card>
            <CardContent className={classes.container}>
                
                {isLoaded && (
                    <div className="map">
                        <Search resolver={modifyGeoLocation} />
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={13}
                            center={location.coords}
                        >
                            {location.loaded && (
                                <Marker position={location.coords} />
                            )}
                        </GoogleMap>
                    </div>
                )}     
                <SnackBar />
            </CardContent>
        </Card>
    )
}

export default Location;