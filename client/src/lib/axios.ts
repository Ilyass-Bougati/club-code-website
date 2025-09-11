import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
console.log("API BASE URL:", process.env.NEXT_PUBLIC_BACKEND_URL);


// Response interceptor for handling 401 and token refresh
api.interceptors.response.use(
  (res) => res, // return response if no error
  async (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
  ) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Retry original request after refresh
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);

        // Redirect to login if refresh fails
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
