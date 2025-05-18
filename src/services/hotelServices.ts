import axios from "axios";
import type { HotelFormData } from "../types";
import { URL_BASE } from "../utils/constants";

export const getAll = async () => {
   return axios.get(`${URL_BASE}/api/hoteles`);
};

export const getId = async (id: number) => {
  return axios.get(`${URL_BASE}/api/hoteles/${id}`);
};

export const create = async (data: HotelFormData) => {
  return axios.post(`${URL_BASE}/api/hoteles`, data);
};

export const update = async (id: number, data: HotelFormData) => {
  return axios.put(`${URL_BASE}/api/hoteles/${id}`, data);
};

export const remove = async (id: number) => {
   return axios.delete(`${URL_BASE}/api/hoteles/${id}`);
 };
 
