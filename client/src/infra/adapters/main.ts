import axios from "axios";

export const mainAdapter = axios.create({
  baseURL: "http://localhost:3002",
});
