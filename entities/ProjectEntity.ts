import LabelEntity from '@/entities/LabelEntity';
import UserEntity from '@/entities/UserEntity';

class ProjectEntity {
  id?: number;

  name!: string;

  useremail!: string;

  description!: string;

  created!: string;

  accounts?: string;

  labels!: LabelEntity[];

  user!: UserEntity;

  imagePath?: string;

  isFavorite?: boolean;
}

export default ProjectEntity;
