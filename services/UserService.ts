import UserEntity from '@/entities/UserEntity';
import BaseApiService from './BaseApiService';

class UserService extends BaseApiService {
  public getById(id: number): Promise<UserEntity> {
    return this.http.get<UserEntity>(`/user/${id}`).then((x) => x.data);
  }
}

export default new UserService();
