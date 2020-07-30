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

  public update(projectId: number, link: LinkEntity): Promise<number> {
    const linkForCreating = {
      ...link,
    };

    return this.http.put<LinkEntity>(`/project/${projectId}/link/${link.id}`, linkForCreating).then((x) => x.data.id);
  }

  public async delete(projectId: number, linkId: number): Promise<void> {
    await this.http.delete<LinkEntity>(`/project/${projectId}/link/${linkId}`);
  }
}

export default new LinkService();
