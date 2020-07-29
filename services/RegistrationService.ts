import SignUpEntity from '@/entities/SignUpEntity';
import AuthInfoEntity from '@/entities/AuthInfoEntity';
import LoginEntity from '@/entities/LoginEntity';
import BaseApiService from './BaseApiService';

class RegistrationService extends BaseApiService {
  public postSignUp(data: SignUpEntity): Promise<AuthInfoEntity> {
    // Backend suggestion
    data.verifyPassword = data.password;

    return this.http.post<AuthInfoEntity>('/signup', data)
      .then((x) => {
        this.setTokenInLocalStorage(x.data.string);

        return x.data;
      });
  }

  public postLogin(data: LoginEntity): Promise<AuthInfoEntity> {
    const stringToBase: string = `${data.email}:${data.password}`;

    return this.http.post<AuthInfoEntity>('/login', data, {
      headers: {
        Authorization: `Basic ${window.btoa(stringToBase)}`,
      },
    }).then((x) => {
      this.setTokenInLocalStorage(x.data.string);

      return x.data;
    });
  }

  private setTokenInLocalStorage(token: string) {
    document.cookie = `token=${token}`;
  }
}

export default new RegistrationService();
