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
            id
        }
    }
`