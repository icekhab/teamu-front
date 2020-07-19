import axios, { AxiosInstance } from 'axios';

const { API_URL: apiUrl } = process.env;

class BaseApiService {
  public http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: `${apiUrl}/api/v1`,
    });
  }
}

export default BaseApiService;
