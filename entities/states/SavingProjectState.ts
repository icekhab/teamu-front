import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import LinkEntity from '@/entities/LinkEntity';
import VacancyEntity from '@/entities/VacancyEntity';
import LabelEntity from '@/entities/LabelEntity';
import FileEntity from '@/entities/FileEntity';

interface SavingProjectState {
  project: DescriptionProjectEntity;
  labels: LabelEntity[];
  links: LinkEntity[];
  vacancies: VacancyEntity[];
  file?: FileEntity;
}

export default SavingProjectState;
