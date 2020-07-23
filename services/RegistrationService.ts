import SignUpEntity from '@/entities/SignUpEntity';
import AuthInfoEntity from '@/entities/AuthInfoEntity';
import BaseApiService from './BaseApiService';

class RegistrationService extends BaseApiService {
  public postSignUp(data: SignUpEntity): Promise<AuthInfoEntity> {
    return this.http.post<AuthInfoEntity>('/signup', data).then((x) => x.data);
  }
}

export default new RegistrationService();
