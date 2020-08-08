import VacancyContactEntity from '@/entities/VacancyContactEntity';
import VacancyShareType from '@/enums/VacancyShareType';

class VacancyEntity {
  id!: number;

  title!: string;

  shareType!: VacancyShareType;

  value?: number;

  aboutVacancy?: string;

  contact?: VacancyContactEntity;
}

export default VacancyEntity;
