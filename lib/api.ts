import axios, { AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

export const createAxiosClient = (header = {} as Partial<AxiosRequestHeaders>) => {
  const client = axios.create({
    baseURL: "https://api.ker-active.com/v1",
    headers: header,
  });

  client.interceptors.response.use(
    (response) => response, // Pass through the successful response
    (error) => {
      if (error.response && error.response.status === 500 && error.response.data?.error === "TokenExpiredError") {
        Cookies.remove("kerGym");
        if (window !== undefined) window.location.href = "/auth/login";
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const client = createAxiosClient({
  ...(Cookies.get("kerGym") && { Authorization: `Bearer ${Cookies.get("kerGym")}` }),
});
