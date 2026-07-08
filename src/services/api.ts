import axios from "axios"

export const BASE_URL = "https://laravue2.blumbit.net/back/public";
const BASE_URL_API = `${BASE_URL}/api`;

const instance = axios.create({
    baseURL: BASE_URL_API
});

// interceptors del cliente

// interceptores del servidor

export default instance;