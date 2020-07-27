import LabelEntity from '@/entities/LabelEntity';
import BaseApiService from './BaseApiService';

class LabelService extends BaseApiService {
  public get(): Promise<LabelEntity[]> {
    return this.http.get<LabelEntity[]>('/project/label').then((x) => x.data);
  }

  public async saveLabels(projectId: number, labels: LabelEntity[]): Promise<void> {
    await this.http.put<any>(`/project/${projectId}/label`, labels);
  }
}

export default new LabelService();
