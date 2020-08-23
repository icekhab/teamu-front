import AllFavoritesEntity from '@/entities/AllFavoritesEntity';
import UserEntity from '@/entities/UserEntity';
import ProjectEntity from '@/entities/ProjectEntity';
import BaseApiService from './BaseApiService';

class UserFavoritesService extends BaseApiService {
  public addFavoriteProject(id: number): Promise<number> {
    return this.http.post<number>(`/user/favorites/project/${id}`).then((x) => x.data);
  }

  public removeFavoriteProject(id: number): Promise<number> {
    return this.http.delete<number>(`/user/favorites/project/${id}`).then((x) => x.data);
  }

  public getAllFavorites(): Promise<AllFavoritesEntity> {
    return this.http.get<AllFavoritesEntity>('/user/favorites').then((x) => x.data);
  }

  public getUsersFavorites(): Promise<UserEntity[]> {
    return this.http.get<UserEntity[]>('/user/favorites/user').then((x) => x.data);
  }

  public getProjectsFavorites(): Promise<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>('/user/favorites/project').then((x) => x.data);
  }

  public addFavoriteUser(id: number): Promise<number> {
    return this.http.post<number>(`/user/favorites/user/${id}`).then((x) => x.data);
  }

  public removeFavoriteUser(id: number): Promise<number> {
    return this.http.delete<number>(`/user/favorites/user/${id}`).then((x) => x.data);
  }
}

export default new UserFavoritesService();
