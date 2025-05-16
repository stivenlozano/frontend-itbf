import axios from 'axios';
import { URL_BASE } from "../utils/constants";

export const getAll = async () => {
  return await axios.get(`${URL_BASE}/roomTypes`);
};