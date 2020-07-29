import LinkEntity from '@/entities/LinkEntity';
import BaseApiService from './BaseApiService';

class LinkService extends BaseApiService {
  public create(projectId: number, link: LinkEntity): Promise<number> {
    const linkForCreating = {
      ...link,
      id: undefined,
    };

    return this.http.post<LinkEntity>(`/project/${projectId}/link`, linkForCreating).then((x) => x.data.id);
  }
}

export default new LinkService();
