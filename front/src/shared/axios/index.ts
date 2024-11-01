import axios from "axios";
import { SERVICES_URL } from "../static-values.ts";

export const axiosClient = axios.create({
  baseURL: SERVICES_URL,
});