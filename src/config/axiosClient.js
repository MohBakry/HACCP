import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or use Redux store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response, // success path
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized: remove token
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error); // always reject the error
  }
);

export default axiosClient;
