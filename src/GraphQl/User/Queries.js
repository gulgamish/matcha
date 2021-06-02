import { gql } from "@apollo/client";

export const GET_USERNAME = gql`
  query user {
    getUser {
      username
    }
  }
`;

export const GET_TAGS = gql`
  query user {
    getUser {
      interests
    }
  }
`;

export const GET_COORD = gql`
  query user {
    getUser {
      lat
      lon
    }
  }
`

export const GET_USER = gql`
  query user {
    getUser {
      firstName
      lastName
      username
      email
      gender
      biography
      sexualPreference,
      birthday,
      distance
    }
  }
`;
