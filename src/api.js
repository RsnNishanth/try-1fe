import axios from "axios";

const api = axios.create({
  baseURL: "https://try-1-bi0l.onrender.com",
  withCredentials: true, // ✅ crucial
});

export default api;
