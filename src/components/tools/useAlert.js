import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react'

const useAlert = () => {
    const [
        alert,
        setAlert
    ] = useState({
        open: false,
        isSucces: false,
        isError: false,
        msg: ""
    });

    const SnackBar = () => (
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={() => {
                setAlert({
                    open: false,
                    isSuccess: false,
                    isError: false,
                    msg: ""
                })
            }}
            anchorOrigin={{
                horizontal: "center",
                vertical: "top"
            }}
        >
            <Alert
                severity={alert.isError ? "error" : "success"}
            >
                {alert.msg}
            </Alert>
        </Snackbar>
    );

    return { SnackBar, setAlert }
}

export default useAlert;