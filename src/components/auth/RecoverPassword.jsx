import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormHelperText,
    InputLabel,
    makeStyles,
    OutlinedInput,
} from '@material-ui/core'
import { SendSharp } from '@material-ui/icons';
import React from 'react'
import useForm from '../tools/useForm';
import { useMutation } from '@apollo/client'
import { RECOVER_PASSWD } from '../../GraphQl/Auth/Mutations';
import useAlert from '../tools/useAlert';

const useStyles = makeStyles({
    card: {
        width: "600px",
        margin: 'auto',
        marginTop: "20px"
    },
    formControl: {
        width: "80%",
        margin: "auto"
    }
})

const RecoverPassword = (props) => {
    const { SnackBar, setAlert } = useAlert();
    const { values, errors, onChange } = useForm({
        email: true
    });
    const { card, formControl } = useStyles();
    const [ recover ] = useMutation(RECOVER_PASSWD, {
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
                isSuccess: true,
                msg: "mail is sent to reset your password"
            })
        }
    })

    return (
        <Card variant="outlined" className={card}>
            <CardContent>
                <FormControl
                    size="small"
                    variant="outlined"
                    className={formControl}
                    error={errors.email}
                >
                    <InputLabel htmlFor="email">
                        email
                    </InputLabel>
                    <OutlinedInput
                        id="email"
                        name="email"
                        label="email"
                        type="email"
                        onChange={onChange}
                    />
                    {errors.email && <FormHelperText error={errors.email}>
                        Invalid email ex: abc@example.com
                    </FormHelperText>}
                </FormControl>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendSharp />}
                    disabled={errors.email}
                    onClick={() => {
                        if (!("email" in values) || values.email === "") {
                            setAlert({
                                open: true,
                                isError: true,
                                msg: "please enter your email address"
                            });
                        }
                        else {
                            recover({
                                variables: {
                                    email: values.email
                                }
                            });
                        }
                    }}
                >
                    send
                </Button>
                <SnackBar />
            </CardActions>
        </Card>
    )
}

export default RecoverPassword;