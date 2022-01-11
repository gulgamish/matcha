import React, { useContext, useEffect, useState, createContext } from 'react'
import { ApolloLink, InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client"
import axios from 'axios';
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from "@apollo/client/link/ws"
import { RetryLink } from "@apollo/client/link/retry"
import { getMainDefinition } from "apollo-utilities"

export var UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);



const UserWrapper = ({ children }) => {
    const [ user, setUser ] = useState({ isLoggedIn: false, token: "" });
    const [ token, setToken ] = useState("");
    const [ loading, setLoading ] = useState(true);

    const uploadLink = createUploadLink({
        uri: '/graphql'
    });

    const socketLink = new WebSocketLink({
        uri: `ws://10.11.6.10:5000/graphql`,
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
            }
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
        axios.post('/graphql' , {
            query: `
                mutation refreshToken {
                    refreshToken {
                        token
                    }
                }
            `
        })
        .then(({ data }) => {
            if (data.data) {
                setToken(data.data.refreshToken.token);
                setUser({
                    isLoggedIn: true,
                    token: data.data.refreshToken.token
                });
            }
            else if (data.errors) {
                setUser({
                    isLoggedIn: false
                })
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);


    if (loading)
        return <div>Loading ...</div>
    else {
        return (
            <UserContext.Provider value={{ user, setUser }}>
                <ApolloProvider client={client}>
                    { children }
                </ApolloProvider>
            </UserContext.Provider>
        )
    }
}

export default UserWrapper;