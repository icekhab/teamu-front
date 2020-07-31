import { RawLocation } from 'vue-router/types/router';

interface UserState {
  isAuthorize: boolean;
  token?: string;
  toAfterLogin?: RawLocation;
}

export default UserState;
