import axios from "axios";
import appConfig from "../config/appConfig";

const apiClient = axios.create({
  baseURL: appConfig.API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
