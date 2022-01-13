import React, { useContext, useEffect, useState, createContext } from 'react'
import { ApolloLink, InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client"
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from "@apollo/client/link/ws"
import { RetryLink } from "@apollo/client/link/retry"
import { getMainDefinition } from "apollo-utilities"

export var UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

var baseURL = process.env.REACT_APP_BASE_URL;

const UserWrapper = ({ children }) => {
    const [ user, setUser ] = useState({ isLoggedIn: false, token: "" });
    const token = localStorage.getItem("token");

    const uploadLink = createUploadLink({
        uri: `http://${baseURL}/graphql`,
    });

    const socketLink = new WebSocketLink({
        uri: `ws://${baseURL}/graphql`,
        options: {
            reconnect: true,
            connectionParams: {
                Authorization: `Bearer ${token}`
            }
        }
    })

    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return forward(operation);
    })

    const client = new ApolloClient({
        link: new RetryLink().split(({ query }) => {
            const { operation } = getMainDefinition(query);
            return operation === "subscription"
        }, socketLink, authLink.concat(uploadLink)),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                  fields: {
                    getUser: {
                      merge(existing, incoming) {
                        return incoming;
                      }
                  },
                },
              }
            }
        }),
        credentials: "include"
    })

    useEffect(() => {
        if (token) {
            setUser({
                isLoggedIn: true,
                token: token
            });
        }
        else {
            setUser({
                isLoggedIn: false
            })
        }
    }, [token]);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ApolloProvider client={client}>
                { children }
            </ApolloProvider>
        </UserContext.Provider>
    )
}

export default UserWrapper;