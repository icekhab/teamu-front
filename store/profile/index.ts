import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import UserEntity from '@/entities/UserEntity';
import UserService from '@/services/UserService';
import ProfileState from '@/entities/states/ProfileState';

export const state = (): ProfileState => ({
  profile: {
    id: 0,
    name: '',
    email: '',
    contacts: [],
  },
});

export const actions : any = {
  async getProfile(
    { commit }: ActionContext<ProfileState, RootState>,
    userId: number,
  ) {
    const profile = await UserService.getById(userId);

    commit('setProfile', profile);
  },
};

export const mutations = {
  setProfile(currentState: ProfileState, profile: UserEntity): void {
    currentState.profile = { ...profile };
  },
};
