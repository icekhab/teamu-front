import UserContactEntity from '@/entities/UserContactEntity';

class UserEntity {
  id!: number;

  name?: string;

  email!: string;

  location?: string;

  about?: string;

  phone?: string;

  role?: string;

  imagePath?: string;

  contacts!: UserContactEntity[];
}

export default UserEntity;
