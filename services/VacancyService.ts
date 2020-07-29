import VacancyEntity from '@/entities/VacancyEntity';
import BaseApiService from './BaseApiService';

class VacancyService extends BaseApiService {
  public create(projectId: number, vacancy: VacancyEntity): Promise<number> {
    const vacancyForCreating = {
      ...vacancy,
      id: undefined,
    };

    return this.http.post<VacancyEntity>(`/project/${projectId}/vacancy`, vacancyForCreating).then((x) => x.data.id);
  }
}

export default new VacancyService();
