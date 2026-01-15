import axios from "axios";

const API = axios.create({
  baseURL: "https://resume-builder-mernbackend-dqqd.onrender.com",
});

export default API;
