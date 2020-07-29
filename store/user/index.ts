import UserState from '@/entities/states/UserState';
import CookieHelper from '@/helpers/CookieHelper';
import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';

export const state = (): UserState => ({
  isAuthorize: false,
  isShowRegistration: false,
  isShowLogin: false,
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

  setToken(currentState: UserState, token: string): void {
    currentState.token = token;
  },

  setIsShowRegistration(currentState: UserState, isShowRegistration: boolean): void {
    currentState.isShowRegistration = isShowRegistration;
  },

  setIsShowLogin(currentState: UserState, isShowLogin: boolean): void {
    currentState.isShowLogin = isShowLogin;
  },
};
