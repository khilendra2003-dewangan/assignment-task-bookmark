import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1").replace(/\/$/, ""),
  withCredentials: true, // 🔥 VERY IMPORTANT for cookies
});

export default api;
