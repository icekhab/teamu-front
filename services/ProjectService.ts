import ProjectEntity from '@/entities/ProjectEntity';
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import DetailProjectEntity from '@/entities/DetailProjectEntity';
import BaseApiService from './BaseApiService';

class ProjectService extends BaseApiService {
  public get(): Promise<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>('/project').then((x) => x.data);
  }

  public getMyPublished(): Promise<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>('/project/my?isPublished=true').then((x) => x.data);
  }

  public getMyDraft(): Promise<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>('/project/my?isPublished=false').then((x) => x.data);
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

  public publish(id: number): Promise<number> {
    return this.http.put<DescriptionProjectEntity>(`/project/${id}/public`).then((x) => x.data.id);
  }

  public draft(id: number): Promise<number> {
    return this.http.put<DescriptionProjectEntity>(`/project/${id}/checkout`).then((x) => x.data.id);
  }
}

export default new ProjectService();
