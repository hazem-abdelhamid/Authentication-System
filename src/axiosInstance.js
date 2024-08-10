import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://dev.backend-api.goldady.com/user-api",
});

export default axiosInstance;
