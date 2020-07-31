import UserState from '@/entities/states/UserState';
import CookieHelper from '@/helpers/CookieHelper';
import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import { RawLocation } from 'vue-router/types/router';

export const state = (): UserState => ({
  isAuthorize: false,
});

export const actions : any = {
  nuxtClientInit({ commit }: ActionContext<UserState, RootState>) {
    const token = CookieHelper.getCookie('token');
    commit('setToken', token);
    commit('setIsAuthorize', !!token);
  },
};

export const mutations = {
  setIsAuthorize(currentState: UserState, isAuthorize: boolean): void {
    currentState.isAuthorize = isAuthorize;
  },

  setToken(currentState: UserState, token?: string): void {
    currentState.token = token;
  },

  setToAfterLogin(currentState: UserState, toAfterLogin?: RawLocation): void {
    currentState.toAfterLogin = toAfterLogin;
  },
};
