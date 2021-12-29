import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from '@material-ui/lab/Alert'
import { v_username, v_name, v_email, v_password } from '../../validation/authValidation'
import {
    Card,
    CardContent,
    CardActions,
    FormControl,
    OutlinedInput,
    InputLabel,
    makeStyles,
    Button,
    FormHelperText,
    Snackbar,
    CircularProgress
} from '@material-ui/core'
import { useMutation } from "@apollo/client"
import { SIGN_UP } from "../../GraphQl/Auth/Mutations"

var useStyles = makeStyles({
    card: {
        width: "500px",
        margin: "auto",
        marginTop: "10px"
    },
    inline: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "5px",
        marginBottom: "5px"
    },
    input: {
        width: "100%",
        marginTop: "5px",
        marginBottom: "5px"
    }
})

var err = {
    'email': "Invalid email format, ex: abc@example.com",
    'firstName': 'first name must contain only \
                    letters between 2 to 20',
    'lastName': 'last name must contain only \
                    letters between 2 to 20'
}

export default function() {
    var [ user, setUser ] = useState({});
    var [ errors, setErrors ] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        rPassword: ""
    });
    var [ alert, setAlert ] = useState({
        open: false,
        isSuccess: false,
        isError: false,
        msg: ""
    });
    var classes = useStyles();
    var [ signup, { data, error, loading } ] = useMutation(SIGN_UP, {
        errorPolicy: "all",
        onCompleted: () => {
            setAlert({
                open: true,
                isSuccess: true,
                msg: "mail is sent, please confirm your account"
            })
        },
        onError: () => {
            setAlert({
                open: true,
                isError: true,
                msg: error.message
            })
        }
    })

    var register = () => {
        const errs = Object.keys(errors).filter(key => errors[key] != "");
        if (errs.length > 0)
            setAlert({
                open: true,
                isError: true,
                msg: `you need to fix your errors before submit`
            })
        else {
            signup({
                variables: user
            });
        }
    }
    
    return (
        <Card className={classes.card}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    register();
                }}
            >
                <CardContent>
                    <div className={classes.inline}>
                        <FormControl
                            variant="outlined"
                            size="small"
                            error={errors.firstName != "" ? true : false}
                            required
                        >
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <OutlinedInput
                                id="firstName"
                                label="First Name"
                                onChange={e => {
                                    if (!v_name(e.target.value))
                                        setErrors({
                                            ...errors,
                                            firstName: "your first name must contain only \
                                                        alphabets and must not exceed 20 characters"
                                        })
                                    else
                                        setErrors({
                                            ...errors,
                                            firstName: ""
                                        })
                                    setUser({
                                        ...user,
                                        firstName: e.target.value
                                    })
                                }}
                            />
                            <FormHelperText error={errors.firstName != "" ? true : false}>
                                {errors.firstName}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            size="small"
                            error={errors.lastName != "" ? true : false}
                            required
                        >
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <OutlinedInput
                                id="lastName"
                                label="Last Name"
                                onChange={e => {
                                    if (!v_name(e.target.value))
                                        setErrors({
                                            ...errors,
                                            lastName: "your last name must contain only \
                                                        alphabets and must not exceed 20 characters"
                                        })
                                    else
                                        setErrors({
                                            ...errors,
                                            lastName: ""
                                        })
                                    setUser({
                                        ...user,
                                        lastName: e.target.value
                                    })
                                }}
                            />
                            <FormHelperText error={errors.lastName != "" ? true : false}>
                                {errors.lastName}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <FormControl
                        variant="outlined"
                        size="small"
                        className={classes.input}
                        error={errors.username != "" ? true : false}
                        required
                    >
                        <InputLabel htmlFor="username">username</InputLabel>
                        <OutlinedInput
                            id="username"
                            label="username"
                            onChange={e => {
                                if (!v_username(e.target.value))
                                    setErrors({
                                        ...errors,
                                        username: "your username must contain only alphabets and digits and \
                                                    not exceed 20 characters"
                                    })
                                else
                                    setErrors({
                                        ...errors,
                                        username: ""
                                    })
                                setUser({
                                    ...user,
                                    username: e.target.value
                                })
                            }}
                        />
                        <FormHelperText error={errors.username != "" ? true : false}>
                            {errors.username}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        size="small"
                        className={classes.input}
                        error={errors.email != "" ? true : false}
                        required
                    >
                        <InputLabel htmlFor="email">email</InputLabel>
                        <OutlinedInput
                            id="email"
                            label="email"
                            type="email"
                            onChange={e => {
                                if (!v_email(e.target.value))
                                    setErrors({
                                        ...errors,
                                        email: "your email is not valid, ex: abc@example.com"
                                    })
                                else
                                    setErrors({
                                        ...errors,
                                        email: ""
                                    })
                                setUser({
                                    ...user,
                                    email: e.target.value
                                })
                            }}
                        />
                        <FormHelperText error={errors.email != "" ? true : false}>
                            {errors.email}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        size="small"
                        className={classes.input}
                        error={errors.password != "" ? true : false}
                        required
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            label="Password"
                            type="password"
                            onChange={e => {
                                if (!v_password(e.target.value))
                                    setErrors({
                                        ...errors,
                                        password: "your password is not valid, \
                                            Minimum eight characters, at least one uppercase letter, one lowercase letter,\
                                            one number and one special character"
                                    })
                                else
                                    setErrors({
                                        ...errors,
                                        password: ""
                                    })
                                setUser({
                                    ...user,
                                    password: e.target.value
                                })
                            }}
                        />
                        <FormHelperText error={errors.password != "" ? true : false}>
                            {errors.password}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        size="small"
                        className={classes.input}
                        error={errors.rPassword != "" ? true : false}
                        required
                    >
                        <InputLabel htmlFor="rpassword">Repeat password</InputLabel>
                        <OutlinedInput
                            id="rpassword"
                            label="Repeat password"
                            type="password"
                            onChange={e => {
                                if (e.target.value != user.password)
                                    setErrors({
                                        ...errors,
                                        rPassword: "repeated password does not match"
                                    })
                                else
                                    setErrors({
                                        ...errors,
                                        rPassword: ""
                                    })
                            }}
                        />
                        <FormHelperText error={errors.rPassword != "" ? true : false}>
                            {errors.rPassword}
                        </FormHelperText>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "150px" }}
                    >
                        {loading ? (
                            <CircularProgress color="#FFFFFF" size="25px" />
                        ) : (
                            "sign up"
                        )}
                    </Button>
                    <Snackbar
                        open={alert.open}
                        autoHideDuration={6000}
                        onClose={() => {
                            setAlert({
                                open: false,
                                isSuccess: false,
                                isError: false,
                                msg: ""
                            });
                        }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        <Alert
                            severity={alert.isError ? "error" : "success"}
                            onClose={() => {
                                setAlert({
                                    open: false,
                                    isSuccess: false,
                                    isError: false,
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