import { gql } from '@apollo/client'

export const USERS = gql`
    query users {
        browseUsers {
            id,
            firstName,
            lastName,
            age,
            distance,
            interests,
            profilePicture,
            score
        }
    }
`