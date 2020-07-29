import axios, { AxiosInstance } from 'axios';
import CookieHelper from '@/helpers/CookieHelper';

const { API_URL: apiUrl } = process.env;

class BaseApiService {
  public http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: `${apiUrl}/api/v1`,
    });

    this.http.interceptors.request.use((config) => {
      const token = process.client ? CookieHelper.getCookie('token') : undefined;

      if (token) {
        config.headers.Authorization = token && `Bearer ${token}`;
      }

      return config;
    });
  }
}

export default BaseApiService;
