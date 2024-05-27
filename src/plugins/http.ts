import { API_URL } from '@/constants/config';
import axios from 'axios';

export const $http = axios.create({
    baseURL: API_URL + '/api/pokemon-api',
});
