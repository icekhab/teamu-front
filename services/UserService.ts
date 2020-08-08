import UserEntity from '@/entities/UserEntity';
import BaseApiService from './BaseApiService';

class UserService extends BaseApiService {
  public getById(id: number): Promise<UserEntity> {
    return this.http.get<UserEntity>(`/user/${id}`).then((x) => x.data);
  }

  public update(profile: UserEntity): Promise<number> {
    return this.http.put<UserEntity>('/user', profile).then((x) => x.data.id);
  }
}

export default new UserService();
