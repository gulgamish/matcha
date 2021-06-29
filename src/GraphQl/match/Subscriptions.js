import { gql } from "@apollo/client"

export const NEW_MESSAGE = gql`
    subscription newMessage {
        newMessage {
            from,
            to,
            content
        }
    }
`

export const NEW_NOTIFICATION = gql`
    subscription newNotification {
        newNotification {
            message
        }
    }
`