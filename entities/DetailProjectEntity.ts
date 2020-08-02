import LabelEntity from '@/entities/LabelEntity';
import LinkEntity from '@/entities/LinkEntity';
import UserEntity from '@/entities/UserEntity';
import VacancyEntity from '@/entities/VacancyEntity';
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';

class DetailProjectEntity implements DescriptionProjectEntity {
  id!: number;

  name!: string;

  description!: string;

  imagePath?: string;

  created!: string;

  isPublished?: boolean;

  user!: UserEntity;

  vacancy!: VacancyEntity[];

  labels!: LabelEntity[];

  links!: LinkEntity[];
}

export default DetailProjectEntity;
