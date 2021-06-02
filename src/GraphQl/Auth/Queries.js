import { gql } from '@apollo/client'

export const GET_TOKEN = gql`
    query getToken {
        token
    }
`