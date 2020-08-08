import UserEntity from '@/entities/UserEntity';
import UserContactEntity from '@/entities/UserContactEntity';
import BaseApiService from './BaseApiService';

class UserContactService extends BaseApiService {
  public create(contact: UserContactEntity): Promise<number> {
    return this.http.post<UserContactEntity>('/user/contact', contact).then((x) => x.data.id);
  }

  public update(contact: UserContactEntity): Promise<number> {
    return this.http.put<UserContactEntity>(`/user/contact/${contact.id}`, contact).then((x) => x.data.id);
  }

  public async delete(contactId: number): Promise<void> {
    await this.http.delete<UserEntity>(`/user/contact/${contactId}`);
  }
}

export default new UserContactService();
