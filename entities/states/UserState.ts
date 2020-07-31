import { RawLocation } from 'vue-router/types/router';
import UserEntity from '@/entities/UserEntity';

interface UserState {
  isAuthorize: boolean;
  user?: UserEntity;
  token?: string;
  toAfterLogin?: RawLocation;
}

export default UserState;
