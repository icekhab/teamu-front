import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import LinkEntity from '@/entities/LinkEntity';
import VacancyEntity from '@/entities/VacancyEntity';
import LabelEntity from '@/entities/LabelEntity';

interface SavingProjectState {
  project: DescriptionProjectEntity;
  labels: LabelEntity[];
  links: LinkEntity[];
  vacancies: VacancyEntity[];
}

export default SavingProjectState;
