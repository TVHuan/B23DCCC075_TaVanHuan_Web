import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:33000/api",
});

export const checkLicensePlate = (plate) => API.get(`/license-plate/${plate}`);
