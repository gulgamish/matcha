import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { CONFIRM_EMAIL, RE_CONFIRM_EMAIL } from '../../GraphQl/Auth/Mutations'
import { useMutation } from '@apollo/client'
import {
    Alert,
    AlertTitle
} from '@material-ui/lab'
import { Button, FormControl, FormHelperText, InputLabel, makeStyles, OutlinedInput, Snackbar } from '@material-ui/core'
import Show from '../tools/Show'
import useForm from '../tools/useForm'
import useAlert from '../tools/useAlert'

const useStyles = makeStyles({
    alert: {
        width: "60%",
        margin: "0 auto",
        marginTop: "10px"
    },
    form: {
        width: '100%'
    }
});

const Content = ({
    errors,
    onChange
}) => {
    const classes = useStyles();
    
    return (
        <FormControl
            size="small"
            variant="outlined"
            error={errors.email}
            className={classes.form}
        >
            <InputLabel>
                email
            </InputLabel>
            <OutlinedInput
                type="email"
                name="email"
                label="email"
                onChange={onChange}
            />
            {errors.email && (
                <FormHelperText>
                    Invalid email, ex: abc@example.com
                </FormHelperText>
            )}
        </FormControl>
    )
}

const Confirm = (props) => {
    const { token } = useParams();
    var [ alert, setAlt ] = useState({
        isError: false,
        isSuccess: false
    });
    const [ open, setOpen ] = useState(false);
    const [ confirmEmail ] = useMutation(CONFIRM_EMAIL, {
        onCompleted: ({ confirmEmail }) => {
            if (confirmEmail) {
                setAlt({
                    isSuccess: true
                })
                setTimeout(() => {
                    props.history.push("/");
                }, 6000);
            }
            else
                setAlt({
                    isError: true
                })
        }
    });
    const { SnackBar, setAlert } = useAlert();
    const {
        values, onChange, errors
    } = useForm({
        email: true
    });
    const [ reConfirmEmail ] = useMutation(RE_CONFIRM_EMAIL, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            })
        },
        onCompleted: ({ resendConfirmationEmail }) => {
            if (resendConfirmationEmail) {
                setAlert({
                    open: true,
                    isSucces: true,
                    msg: "mail is sent to confirm your email"
                })
                setOpen(false);
                setTimeout(() => {
                    props.history.push("/");
                }, 6000);
            }
        }
    })
    const classes = useStyles();

    const Actions = () => {
    
        const send = () => {
            if (values.email == "")
                setAlert({
                    open: true,
                    isError: true,
                    msg: "Please enter your email"
                })
            else if (errors.email)
                setAlert({
                    open: true,
                    isError: true,
                    msg: "Please clear your error"
                })
            else
                reConfirmEmail({
                    variables: {
                        email: values.email
                    }
                })
        }
    
        return (
            <Button
                variant="outlined"
                color="primary"
                onClick={send}
            >
                send
            </Button>
        )
    }

    useEffect(() => {
        confirmEmail({
            variables: { token }
        });
    }, []);

    return (
        <div className={classes.alert}>
            {alert.isSuccess && (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    your account is now valid
                </Alert>
            )}
            {alert.isError && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                     please try again, <a onClick={() => {
                         setOpen(true);
                     }} href="#">click here</a>
                     <Show
                        open={open}
                        setOpen={setOpen}
                        title="send confirmation email"
                        Content={<Content
                            onChange={onChange}
                            errors={errors}
                        />}
                        Actions={<Actions />}
                     />
                     <SnackBar />
                </Alert>
            )}
        </div>
    )
}

export default Confirm;