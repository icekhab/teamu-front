import UserEntity from '@/entities/UserEntity';
import UserContactEntity from '@/entities/UserContactEntity';

interface ProfileState {
  profile: UserEntity;
  contacts: UserContactEntity[];
}

export default ProfileState;
