import axios from "axios";
import { API_ENDPOINT } from "./constants";

const API = axios.create({
  baseURL: `${API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    console.log(error);
  }
);

const setApiAccessToken = (accessToken: string | undefined) => {
  if (accessToken)
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  else delete API.defaults.headers.common.Authorization;
};

export { API, setApiAccessToken };
