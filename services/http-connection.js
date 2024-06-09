import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000` + "/api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
    }
});

// axiosInstance.interceptors.request.use(
//     async (config) => {
//         config.headers ["Authorization"] = Cookie.get("next-auth.session-token") ? "Bearer " + Cookie.get("next-auth.session-token") : null;
        
//         // "Bearer " + localStorage.getItem("next-auth.session-token");
//         return config;
//     },
//     error => {
//         console.log("error", error)
//         return Promise.reject(error);
//     }
// );


axiosInstance.interceptors.response.use((response) => {
    return response;

}, (error) => { 
    return Promise.reject(error.response);
});
export default axiosInstance;