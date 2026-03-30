import axios from "axios";

const api = axios.create({
    baseURL:"https://travel-agency-website-nqre.onrender.com",
    withCredentials:true
});

export default api;