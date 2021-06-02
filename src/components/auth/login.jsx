import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useUserContext } from '../../user.wrapper';
import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from '@material-ui/lab/Alert'
import { v_username, v_password } from '../../validation/authValidation'
import {
    Card,
    CardContent,
    CardActions,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    makeStyles,
    Snackbar,
} from '@material-ui/core';
import { useMutation } from '@apollo/client'
import { SIGN_IN } from "../../GraphQl/Auth/Mutations";
import ReactLoading from 'react-loading'
import useForm from '../tools/useForm';
import ResetPassword from './RecoverPassword';

const useStyles = makeStyles({
    card: {
        width: "400px",
        margin: 'auto',
        marginTop: "10px"
    },
    input: {
        marginTop: "5px",
        marginBottom: "5px"
    }
})

export default function(props) {
    var { values, onChange } = useForm({});
    var [ alert, setAlert ] = useState({
        open: false,
        msg: ""
    });
    var [ open, setOpen ] = useState(false);
    var classes = useStyles();
    const [ signin, { data, error, loading } ] = useMutation(SIGN_IN, {
        errorPolicy: 'all',
    });

    console.log(values);

    const login = () => {
        signin({
            variables: values
        })
        if (loading)
            setOpen(true);
        if (error) {
            setAlert({
                open: true,
                msg: error.message
            });
            setOpen(false);
        }
    }

    return (
        <Card className={classes.card}>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    login();
                }}
            >
                <CardContent>
                    <div className="form-signin">
                        <FormControl variant="outlined" size="small" className={classes.input} required>
                            <InputLabel htmlFor="username">
                                username
                            </InputLabel>
                            <OutlinedInput
                                id="username"
                                label="username"
                                name="username"
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl variant="outlined" size="small" className={classes.input} required>
                            <InputLabel htmlFor="password">
                                password
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                type="password"
                                label="password"
                                name="password"
                                onChange={onChange}
                            />
                        </FormControl>
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        sign in
                    </Button>
                     <Link to="/recover">
                        Forgot your password ?
                    </Link>
                    {open && (
                        <ReactLoading type="bars" color="lightgray" width="30px" height="30px" />
                    )}
                    <Snackbar
                        open={alert.open}
                        onClose={() => {
                            setAlert({
                                open: false,
                                msg: ""
                            })
                        }}
                        autoHideDuration={5000}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        <Alert
                            severity="error"
                            onClose={() => {
                                setAlert({
                                    open: false,
                                    msg: ""
                                })
                            }}
                        >
                            {alert.msg}
                        </Alert>
                    </Snackbar>
                </CardActions>
            </form>
        </Card>
    )
}