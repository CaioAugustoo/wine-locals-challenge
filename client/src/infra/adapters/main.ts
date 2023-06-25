import axios from "axios";

export const mainAdapter = axios.create({
  baseURL: process.env.API_URL ?? "http://localhost:3002",
});
