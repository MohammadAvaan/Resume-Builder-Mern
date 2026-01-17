import axios from "axios";

const API = axios.create({
  baseURL: "https://resume-builder-mern-w0xx.onrender.com",
});

export default API;
