import axios from "axios";
import TokenServices from "../../token/TokenServices";

const with_default = axios.create({
    baseURL:"http://localhost:3001/api/v1",
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:false,
    timeout:10000,
});


let with_token = axios.create({
    baseURL:"http://localhost:3001/api/v1",
    headers:{
        "Content-Type":"application/json",
        "Authorization":localStorage.getItem('token')
    },
    timeout:10000,
});

export default {
    with_default,
    with_token
};  