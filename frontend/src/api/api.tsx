import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: serverUrl,
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    console.log(error);
    if (error.response) {
      const newError = {
        status: error.status,
        message: error.response?.data?.message,
      };
      console.log(newError);
      throw {
        ...newError,
      };
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
    return Promise.reject(error);
  }
);

export const getToken = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).api_key : "";
};

export { axiosInstance as api };
