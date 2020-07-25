import ContactEntity from '@/entities/ContactEntity';
import VacancyShareType from '@/enums/VacancyShareType';

class VacancyEntity {
  id!: number;

  title!: string;

  shareType!: VacancyShareType;

  value?: number;

  aboutVacancy!: string;

  contact!: ContactEntity;
}

export default VacancyEntity;
