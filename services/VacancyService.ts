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

  public update(projectId: number, vacancy: VacancyEntity): Promise<number> {
    return this.http.put<VacancyEntity>(`/project/${projectId}/vacancy/${vacancy.id}`, vacancy).then((x) => x.data.id);
  }

  public async delete(projectId: number, vacancyId: number): Promise<void> {
    await this.http.delete<void>(`/project/${projectId}/vacancy/${vacancyId}`);
  }
}

export default new VacancyService();
