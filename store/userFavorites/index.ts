import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import UserFavoritesService from '@/services/UserFavoritesService';
import UserFavoritesState from '@/entities/states/UserFavoritesState';

export const state = (): UserFavoritesState => ({
  projects: [],
  users: [],
});

export const actions : any = {
  async addFavoriteProject(context: ActionContext<UserFavoritesState, RootState>, id: number) {
    await UserFavoritesService.addFavoriteProject(id);
  },
};
