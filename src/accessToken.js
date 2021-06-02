import { ApolloLink } from "@apollo/client";

var accessToken = "";

export const setAccessToken = (token) => {
    accessToken = token;
}

export const getAccessToken = () => {
    return accessToken;
}