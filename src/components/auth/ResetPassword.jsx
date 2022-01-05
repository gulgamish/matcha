import { useMutation } from '@apollo/client';
import {
    Card,
    CardActions,
    CardContent,
    FormControl,
    InputLabel,
    OutlinedInput,
    makeStyles,
    FormHelperText,
    Button
} from '@material-ui/core';
import React from 'react'
import { useParams } from 'react-router';
import { RESET_PASSWD } from '../../GraphQl/Auth/Mutations';
import useAlert from '../tools/useAlert';
import useForm from '../tools/useForm';

const useStyles = makeStyles({
    card: {
        width: "400px",
        margin: 'auto',
        marginTop: "20px"
    },
    formControl: {
        width: "100%",
        marginTop: "5px",
        marginBottom: "5px"
    }
})

const ResetPassword = () => {
    const { token } = useParams();
    const { values, errors, onChange } = useForm({
        password: true,
        rPassword: true
    });
    const { SnackBar, setAlert } = useAlert();
    const { card, formControl } = useStyles();
    const [ reset ] = useMutation(RESET_PASSWD, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            })
        },
        onCompleted: (data) => {
            setAlert({
                open: true,
                isSucces: true,
                msg: "Updated Successfully"
            })
        }
    })

    return (
        <Card variant="outlined" className={card}>
            <CardContent>
                <FormControl variant="outlined" size="small" className={formControl} error={errors.password}>
                    <InputLabel htmlFor="password">
                        password
                    </InputLabel>
                    <OutlinedInput
                        name="password"
                        label="password"
                        type="password"
                        onChange={onChange}
                    />
                    {errors.password && (
                        <FormHelperText error={errors.password}>
                            Invalid password
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl variant="outlined" size="small" className={formControl} error={errors.rPassword}>
                    <InputLabel htmlFor="Repeat-password">
                        Repeat password
                    </InputLabel>
                    <OutlinedInput
                        name="rPassword"
                        label="Repeat-password"
                        type="password"
                        onChange={onChange}
                    />
                    {errors.rPassword && (
                        <FormHelperText error={errors.rPassword}>
                            the repeated password does not match
                        </FormHelperText>
                    )}
                </FormControl>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={errors.password && errors.rPassword}
                    onClick={() => {
                        if (
                            !("password" in values) || !("rPassword" in values) ||
                            values.password === "" || values.rPassword === ""
                        )
                            setAlert({
                                open: true,
                                isError: true,
                                msg: "Please fill all the fields below"
                            })
                        else
                            reset({
                                variables: {
                                    password: values.password,
                                    token
                                }
                            })
                    }}
                >
                    change
                </Button>
                <SnackBar />
            </CardActions>
        </Card>
    )
}

export default ResetPassword;
