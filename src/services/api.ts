import axios from "axios"

export const BASE_URL = "https://laravue2.blumbit.net/back/public";
const BASE_URL_API = `${BASE_URL}/api`;

// const token = localStorage.getItem("access_token") || null;

const instance = axios.create({
    baseURL: BASE_URL_API,
    timeout: 10000,
   /* headers: {
        "Content-Type": 'application/json',
        Authorization: 'Bearer '+token 
    }
    */
});

// interceptors del cliente (salida hacia el backend)
instance.interceptors.request.use((config) => {
    console.log("INTERCEPTOR ***************** request")
    const token = localStorage.getItem("access_token") || null;

    
    if(token){
        config.headers["Content-Type"] = "application/json"
        config.headers.Authorization =  "Bearer "+ token
    }
    
    return config;
});

// interceptores del servidor (ingreso desde el Backend)
instance.interceptors.response.use(
    (resp) => {
        console.log("INTERCEPTOR ***************** response")
        return resp
    },
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem("access_token");
            location.href = "/auth/ingresar"
        }
        return Promise.reject(error);
    }
)

export default instance;