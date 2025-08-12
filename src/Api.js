import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
});

// Agar token bo'lsa, shundagina qo'shamiz. Bo'lmasa header'ni tozalaymiz.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default api;