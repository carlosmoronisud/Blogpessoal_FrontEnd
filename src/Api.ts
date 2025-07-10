import axios from "axios";

// Use o valor hardcoded do Render, já que o .env tem dado problemas
const API_BASE_URL = "https://blogpessoal-esoc.onrender.com";
console.log("API_BASE_URL (Api.ts):", API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL
});

export default api;