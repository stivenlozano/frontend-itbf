import axios from "axios";
import { URL_BASE } from "../utils/constants";

export const getAll = async () => {
   return axios.get(`${URL_BASE}/api/accommodations`);
};