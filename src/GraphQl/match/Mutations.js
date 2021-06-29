import { gql } from "@apollo/client"

export const SEND_MESSAGE = gql`
    mutation sendMessage (
        $to: String!,
        $content: String!
    ) {
        sendMessage (
            to: $to,
            content: $content
        ) {
            from
            to
            content
        }
    }
`

export const LIKE = gql`
    mutation like (
        $id: String!
    ) {
        likeUser (
            userToLikeId: $id
        )
    }
`

export const UNLIKE = gql`
    mutation unlike (
        $id: String!
    ) {
        unLikeUser (
            userToUnlikeId: $id
        )
    }
`

export const BLOCK = gql`
    mutation blockUser (
        $id: String!
    ) {
        blockUser (
            userToBlockId: $id
        )
    }
`

export const REPORT = gql`
    mutation reportUser (
        $id: String!
    ) {
        reportUser (
            userId: $id
        )
    }
`