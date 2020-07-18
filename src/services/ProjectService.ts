import ProjectEntity from '@/entities/ProjectEntity';
import BaseApiService from './BaseApiService';

class ProjectService extends BaseApiService {
  public get(): Promise<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>('/project').then((x) => x.data);
  }
}

export default new ProjectService();
