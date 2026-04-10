import axios from 'axios';

const API = axios.create({ baseURL: 'https://backend-production.up.railway.app/api' });

export default API;
