import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const api = axios.create({
    baseURL : isLocal ? import.meta.env.VITE_BACKEND_URL_PROD : import.meta.env.VITE_BACKEND_URL_PROD,
    withCredentials : true
})
export {api as axios};