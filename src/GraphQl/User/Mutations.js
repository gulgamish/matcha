import { gql } from '@apollo/client'

export const SIGN_OUT = gql`
    mutation signOut {
        logOut
    }
`

export const UPLOAD = gql`
    mutation uploadFile (
        $type: Type!
        $file: Upload!
    ) {
        uploadFile (
            type: $type
            file: $file
        ) {
            url
        }
    }
`

export const ADD_TAG = gql`
    mutation addTag (
        $tag: String!
    ) {
        addInterrest (
            interest: $tag
        )
    }
`

export const DELETE_TAG = gql`
    mutation deleteTag (
        $tag: String!
    ) {
        removeInterrest (
            interest: $tag
        )
    }
`

export const MODIFY_FIRST_NAME = gql`
    mutation modifyFirstName (
        $firstName: String!
    ) {
        modifyFirstName (
            firstName: $firstName
        )
    }
`

export const MODIFY_LAST_NAME = gql`
    mutation modifyLastName (
        $lastName: String!
    ) {
        modifyLastName (
            lastName: $lastName
        )
    }
`

export const MODIFY_EMAIL = gql`
    mutation modifyEmail (
        $email: String!
    ) {
        modifyEmail (
            email: $email
        )
    }
`

export const MODIFY_BIRTHDAY = gql`
    mutation modifyBirthday (
        $birthday: String!
    ) {
        modifyBirthday (
            birthday: $birthday
        )
    }
`

export const MODIFY_GENDER = gql`
    mutation modifyGender (
        $gender: Gender!
    ) {
        addGender (
            gender: $gender
        )
    }
`

export const MODIFY_SEXUAL_ORIENTATION = gql`
    mutation modifySexualOrientation (
        $sexualOrientation: SexualPreference!
    ) {
        addSexualPreference (
            sexualPreference: $sexualOrientation
        )
    }
`

export const MODIFY_BIO = gql`
    mutation modifyBio (
        $bio: String!
    ) {
        addBiography (
            biography: $bio
        )
    }
`

export const MODIFY_GEO_POSITION = gql`
    mutation modifyGeoPosition (
        $lon: Float!,
        $lat: Float!
    ) {
        modifyPosition (
            lat: $lat,
            lon: $lon
        )
    }
`

export const FORCE_GEO_POSITION = gql`
    mutation forceGeoPosition {
        forceGeolocation {
            lat
            lon
        }
    }
`

export const DELETE_PICTURE = gql`
    mutation deletePicture (
        $url: String!,
        $type: Type!
    ) {
        deletePicture (
            url: $url,
            type: $type
        )
    }
`