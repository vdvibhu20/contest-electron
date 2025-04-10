import axios from "axios";
import qs from "qs";

export default function createAxiosClient({
  baseURL = import.meta.env.VITE_API_ENDPOINT, 
} = {}) {
  const cookie = localStorage.getItem('cb_auth')
  console.log('cookie', cookie)
// console.log('baseURL: ' + baseURL)
const client = axios.create({
    baseURL,
    withCredentials: true, // ✅ Ensures cookies and CORS credentials work
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(cookie ? { Authorization: `JWT ${cookie}` } : {}),
    },
  });
  client.interceptors.request.use((config) => {
    const cbAuth = localStorage.getItem("cb_auth");  // Get token from localStorage

    if (cbAuth) {
      config.headers.Authorization = `JWT ${cbAuth}`;
    }

    config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: "brackets" });

    return config;
  });
  client.interceptors.request.use(function (config) {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: "brackets" });
    };
    return config;
  });

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log("ERROR from axios client", error);
      return Promise.reject(error);
    }
  );

  return client;
}
