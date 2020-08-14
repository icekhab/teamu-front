import ProjectEntity from '@/entities/ProjectEntity';
import UserEntity from '@/entities/UserEntity';

interface UserFavoritesState {
  projects: ProjectEntity[];
  users: UserEntity[];
}

export default UserFavoritesState;
