import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Card,
    CardContent,
    CardActions,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    makeStyles,
    CircularProgress,
} from '@material-ui/core';
import { useMutation } from '@apollo/client'
import { SIGN_IN } from "../../GraphQl/Auth/Mutations";
import useForm from '../tools/useForm';
import useAlert from '../tools/useAlert';
import "./style.css"

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
    const [ signin, { loading } ] = useMutation(SIGN_IN, {
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

    if (loading)
        return (
            <Card
                className={classes.card}
            >
                <CardContent>
                    <div className="load">
                        <CircularProgress />
                    </div>
                </CardContent>
            </Card>
        )

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