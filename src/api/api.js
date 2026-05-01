import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8089/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
    
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) =>{
    return response},
  
   (error) => {
    if (error.response) {
        
      const status = error.response.status;
   
      if (status === 401) {
        console.log("Brak autoryzacji");
        localStorage.removeItem("token");
      }

      if (status === 403) {
        console.log("Brak dostępu");
      }

      if (status === 500) {
        console.log("Błąd serwera");
      }
    } else if (error.request) {
      console.log("Brak odpowiedzi z serwera");
    } else {
      console.log("Błąd konfiguracji:", error.message);
    }

    return Promise.reject(error);
  }
);  

export default api;