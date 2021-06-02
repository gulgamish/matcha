import { gql } from '@apollo/client'

export const USERS = gql`
    query users {
        browseUsers {
            firstName,
            lastName,
            age
        }
    }
`