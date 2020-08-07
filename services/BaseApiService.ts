import axios, { AxiosInstance } from 'axios';
import CookieHelper from '@/helpers/CookieHelper';

const { API_URL: apiUrl } = process.env;
const { UTEAM_API_URL: uploaderUrl } = process.env;

class BaseApiService {
  public http: AxiosInstance;

  public uploaderHttp: AxiosInstance;

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

    this.uploaderHttp = axios.create({
      baseURL: `${uploaderUrl}/api/v1`,
    });
  }
}

export default BaseApiService;
