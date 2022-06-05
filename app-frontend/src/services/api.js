import axios from "axios";

//axios.defaults.baseURL = 'http://localhost:8000';

let axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});

export default axiosInstance;

/*console.log(axios);

let axiosInstance = axios.constructor();

console.log(axiosInstance);*/

//export default axios;