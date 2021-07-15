import { gql } from '@apollo/client'

export const USERS_SORTED_FILTRED = gql`
    query browse (
        $orderBy: OrderByInput,
        $filterBy: FilterByInput
    ) {
        browseUsers (
            orderBy: $orderBy
            filterBy: $filterBy
        ) {
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

export const GET_USER = gql`
    query checkProfile (
        $id: ID
    ) {
        checkProfile (
            profileId: $id
        ) {
            firstName
            lastName
            username
            distance
            gender
            biography
            score
            sexualPreference
            age
            interests
            profilePicture
            regularPictures
            liked
            lastSeen
        }
    }
`

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
                id
                from,
                to,
                content
            }
        }
`

export const GET_NOTIFICATIONS = gql`
    query getNotifications {
        getNotifications {
            message
        }
    }
`