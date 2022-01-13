import axios from "axios"

var baseURL = process.env.REACT_APP_BASE_URL;

const client = axios.create({
    baseURL: `http://${baseURL}`,
});

export default client;