import axios from "axios";
import { API_URL } from "../keys/url";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
$api.interceptors.response.use((config) => {
  return config;
});

export default $api;
