import axios, { AxiosHeaders, AxiosRequestHeaders } from "axios";

export const createAxiosClient = (
  header = {} as Partial<AxiosRequestHeaders>
) => {
  return axios.create({
    baseURL: "https://api.ker-active.com/v1",
    headers: header,
  });
};

export const client = createAxiosClient();
