import axios from 'axios';
import { ApplianceService } from './services/appliances';

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export const apiClient = () => {
  return new ApplianceService(axiosInstance);
};
