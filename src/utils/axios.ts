import axios from "axios";
import { endpoint } from "config/api";

const axiosInstance = axios.create({
  baseURL: endpoint,
  headers: {
    'Cache-Control': 'max-age=3600'
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
);

export default axiosInstance;
