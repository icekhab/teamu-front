import BaseApiService from './BaseApiService';

class UserFavoritesService extends BaseApiService {
  public addFavoriteProject(id: number): Promise<number> {
    return this.http.post<number>(`/user/favorites/project/${id}`).then((x) => x.data);
  }
}

export default new UserFavoritesService();
