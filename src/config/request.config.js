// Request config file to include credentials to allow proper authentication

import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const axiosInstance = axios.create({
    //the api url that prepends the requests
    baseURL: API_ENDPOINT,
    // allows cross-site Access-Control requests to include credentials, such as cookies, so requests can be proper authenticated and made.
    withCredentials: true
})
