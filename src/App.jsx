import React, { useEffect } from 'react'
import AppRouter from './App.router'
import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
    createHttpLink
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import './style.css'
import axios from 'axios'

function App() {

    return <AppRouter />
};

export default App;