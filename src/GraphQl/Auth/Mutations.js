import { gql } from '@apollo/client'

export const REFRESH_TOKEN = gql`
    mutation refreshToken {
        refreshToken {
            token
        }
    }
`

export const SIGN_IN = gql`
    mutation signin (
        $username: String!,
        $password: String!
    ) {
        login (
            username: $username,
            password: $password
        ) {
            token
        }
    }
`

export const SIGN_UP = gql`
    mutation signup (
        $firstName: String!,
        $lastName: String!,
        $username: String!,
        $email: String!,
        $password: String!
    ) {
        register (
            registerInput: {
                firstName: $firstName,
                lastName: $lastName,
                username: $username,
                email: $email,
                password: $password
            }
        ) {
            id
        }
    }
`

export const CONFIRM_EMAIL = gql`
    mutation confirmEmail (
        $token: String!
    ) {
        confirmEmail (
            token: $token
        )
    }
`

export const RECOVER_PASSWD = gql`
    mutation recover (
        $email: String!
    ) {
        recoverPassword (
            email: $email
        ) {
            id
        }
    }
`

export const RESET_PASSWD = gql`
    mutation reset (
        $password: String!,
        $token: String!
    ) {
        resetPassword (
            resetInput: {
                password: $password,
                resetToken: $token
            }
        ) {
            id
        }
    }
`

export const RE_CONFIRM_EMAIL = gql`
    mutation reConfirmEmail (
        $email: String!
    ) {
        resendConfirmationEmail (
            userEmail: $email
        )
    }
`