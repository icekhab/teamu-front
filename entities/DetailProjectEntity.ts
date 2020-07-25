import LabelEntity from '@/entities/LabelEntity';
import LinkEntity from '@/entities/LinkEntity';
import UserEntity from '@/entities/UserEntity';
import VacancyEntity from '@/entities/VacancyEntity';

class DetailProjectEntity {
  id!: number;

  name!: string;

  description!: string;

  imagePath?: string;

  created!: string;

  user!: UserEntity;

  vacancy!: VacancyEntity[];

  labels!: LabelEntity[];

  links!: LinkEntity[];
}

export default DetailProjectEntity;
