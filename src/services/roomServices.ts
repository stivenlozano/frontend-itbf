import axios from 'axios';
import type { RoomConfigurationRequest } from '../types';
import { URL_BASE } from "../utils/constants";

export const getId = async (id: number) => {
  return axios.get(`${URL_BASE}/api/roomConfiguration/${id}`);
};

export const getByHotel = async (id: number) => {
  return axios.get(`${URL_BASE}/api/roomConfiguration/hotel/${id}`);
};

export const create = async (data: RoomConfigurationRequest) => {
  return axios.post(`${URL_BASE}/api/roomConfiguration`, data);
};

export const update = async (id: number, data: RoomConfigurationRequest) => {
  return axios.put(`${URL_BASE}/api/roomConfiguration/${id}`, data);
};

export const remove = async (id: number) => {
  return axios.delete(`${URL_BASE}/api/roomConfiguration/${id}`);
};