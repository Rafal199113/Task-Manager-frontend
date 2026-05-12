import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8089/api",
});

api.defaults.withCredentials = true;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (
    token &&
    config.url !== "/refreshToken"
  ) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
          console.log("Response:", response.data); 
    return response},

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refreshToken"
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post(
          "/refreshToken",
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: "",
            },
          }
        );

        const newToken = res.data.access_token;

        localStorage.setItem("token", newToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newToken}`;

        return api(originalRequest);

      } catch (err) {
        localStorage.removeItem("token");

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default api;