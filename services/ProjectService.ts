import ProjectEntity from '@/entities/ProjectEntity';
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import DetailProjectEntity from '@/entities/DetailProjectEntity';
import BaseApiService from './BaseApiService';

class ProjectService extends BaseApiService {
  public get(): Promise<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>('/project').then((x) => x.data);
  }

  public getById(id: number): Promise<DetailProjectEntity> {
    return this.http.get<DetailProjectEntity>(`/project/${id}`).then((x) => x.data);
  }

  public create(project: DescriptionProjectEntity): Promise<number> {
    return this.http.post<DescriptionProjectEntity>('/project', project).then((x) => x.data.id);
  }

  public update(project: DescriptionProjectEntity): Promise<number> {
    return this.http.put<DescriptionProjectEntity>(`/project/${project.id}`, project).then((x) => x.data.id);
  }
}

export default new ProjectService();
