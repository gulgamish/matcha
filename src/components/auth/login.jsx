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
import useAlert from '../tools/useAlert';

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
    const { SnackBar, setAlert } = useAlert();
    var classes = useStyles();
    const [ signin ] = useMutation(SIGN_IN, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            })
        },
        onCompleted: (data) => {
            window.location.reload();
        }
    });

    console.log(values);

    return (
        <Card className={classes.card}>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    signin({
                        variables: values
                    })
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
                </CardActions>
                <SnackBar />
            </form>
        </Card>
    )
}