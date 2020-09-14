import UserEntity from '@/entities/UserEntity';
import ProjectEntity from '@/entities/ProjectEntity';

class AllFavoritesEntity {
  users!: UserEntity[];

  projects!: ProjectEntity[];
}

export default AllFavoritesEntity;
