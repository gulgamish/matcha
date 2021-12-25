import React, { useEffect, useState } from 'react'
import { v_email, v_name, v_password } from '../../validation/authValidation'

const useForm = ({
    email = false,
    password = false,
    rPassword = false,
    firstName = false,
    lastName = false
}) => {
    const [ values, setValues ] = useState({});
    const [ errors, setErrors ] = useState({
        email: false,
        password: false,
        rPassword: false,
        firstName: false,
        lastName: false
    });

    console.log(errors);

    useEffect(() => {
        if (lastName && ("lastName" in values)) {
            if (!v_name(values.lastName)) {
                setErrors({
                    ...errors,
                    lastName: true
                })
            }
            else
                setErrors({
                    ...errors,
                    lastName: false
                })
        }
        if (firstName && ("firstName" in values)) {
            if (!v_name(values.firstName))
                setErrors({
                    ...errors,
                    firstName: true
                });
            else
                setErrors({
                    ...errors,
                    firstName: false
                });
        }
        if (email && ("email" in values)) {
            if (!v_email(values.email))
                setErrors({
                    ...errors,
                    email: true
                })
            else
                setErrors({
                    ...errors,
                    email: false
                })
        }
        if (password && ("password" in values)) {
            if (!v_password(values.password))
                setErrors({
                    ...errors,
                    password: true
                })
            else
                setErrors({
                    ...errors,
                    password: false
                })
        }
        if (rPassword && ("rPassword" in values)) {
            if (values.rPassword != values.password) {
                setErrors({
                    ...errors,
                    rPassword: true
                })
            }
            else
                setErrors({
                    ...errors,
                    rPassword: false
                })
        }
    }, [values])

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    return { onChange, values, errors, setValues };
}

export default useForm;