import { RawLocation } from 'vue-router/types/router';

interface UserState {
  isAuthorize: boolean;
  token?: string;
  toAfterLogin?: RawLocation;
  isShowLogin: boolean;
  isShowRegistration: boolean;
}

export default UserState;
