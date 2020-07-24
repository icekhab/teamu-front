import LabelEntity from '@/entities/LabelEntity';
import LinkEntity from '@/entities/LinkEntity';
import UserEntity from '@/entities/UserEntity';

class DetailProjectEntity {
  id?: number;

  name!: string;

  description!: string;

  imagePath?: string;

  created!: string;

  user!: UserEntity;

  labels!: LabelEntity[];

  links!: LinkEntity[];
}

export default DetailProjectEntity;
