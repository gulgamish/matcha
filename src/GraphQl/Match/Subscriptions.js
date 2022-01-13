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

export const NEW_LAST_SEEN = gql`
    subscription newLastSeen {
        newLastSeen {
            id,
            last_seen
        }
    }
`