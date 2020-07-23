import LabelEntity from '@/entities/LabelEntity';
import LinkEntity from '@/entities/LinkEntity';

class DetailProjectEntity {
  id?: number;

  name!: string;

  description!: string;

  created!: string;

  labels!: LabelEntity[];

  links!: LinkEntity[];
}

export default DetailProjectEntity;
