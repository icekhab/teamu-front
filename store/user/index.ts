import UserState from '@/entities/states/UserState';
import CookieHelper from '@/helpers/CookieHelper';
import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import { RawLocation } from 'vue-router/types/router';
import UserEntity from '@/entities/UserEntity';
import AuthInfoEntity from '@/entities/AuthInfoEntity';
import UserService from '@/services/UserService';

export type LoginActionParam = {
  user: UserEntity;
  authInfo: AuthInfoEntity;
};

export const state = (): UserState => ({
  isAuthorize: false,
});

export const actions : any = {
  nuxtClientInit({ commit }: ActionContext<UserState, RootState>) {
    const token = CookieHelper.getCookie('token');
    const user = CookieHelper.getCookie('user');

    commit('setToken', token);
    commit('setUser', user && JSON.parse(user));
    commit('setIsAuthorize', !!token);
  },

  async login(
    { commit }: ActionContext<UserState, RootState>,
    { string, userID }: AuthInfoEntity,
  ) {
    CookieHelper.setCookie('token', string);

    const user = await UserService.getById(userID);
    CookieHelper.setCookie('user', JSON.stringify(user));

    commit('setToken', string);
    commit('setUser', user);
    commit('setIsAuthorize', true);
  },

  logout({ commit }: ActionContext<UserState, RootState>) {
    CookieHelper.setCookie('token', '');

    commit('setToken', undefined);
    commit('setUser', undefined);
    commit('setIsAuthorize', false);
  },
};

export const mutations = {
  setIsAuthorize(currentState: UserState, isAuthorize: boolean): void {
    currentState.isAuthorize = isAuthorize;
  },

  setToken(currentState: UserState, token?: string): void {
    currentState.token = token;
  },

  setUser(currentState: UserState, user?: UserEntity): void {
    currentState.user = user;
  },

  setToAfterLogin(currentState: UserState, toAfterLogin?: RawLocation): void {
    currentState.toAfterLogin = toAfterLogin;
  },
};
