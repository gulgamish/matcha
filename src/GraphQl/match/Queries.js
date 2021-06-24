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

export const GET_MATCHED_USERS = gql`
    query match {
        getMatchedUsers {
            id,
            profilePicture,
            username
        }
    }
`

export const GET_MESSAGES = gql`
    query GetMessages (
            $from: String!
        ) {
            getMessages (
                from: $from
            ) {
                from,
                to,
                content
            }
        }
`