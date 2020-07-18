import LabelEntity from '@/entities/LabelEntity';
import UserEntity from '@/entities/UserEntity';

class ProjectEntity {
  id?: number;

  useremail!: string;

  description!: string;

  created!: string;

  labels!: LabelEntity[];

  user!: UserEntity;
}

export default ProjectEntity;
