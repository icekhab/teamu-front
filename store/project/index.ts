import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import ProjectService from '@/services/ProjectService';
import ProjectState from '@/entities/states/ProjectsState';
import DetailProjectEntity from '@/entities/DetailProjectEntity';

export const state = (): ProjectState => ({
  project: {
    id: 0,
    vacancy: [],
    created: '',
    description: '',
    labels: [],
    links: [],
    name: '',
    user: {
      id: 0,
      email: '',
      contacts: [],
    },
  },
});

export const actions : any = {
  async getProject(context: ActionContext<ProjectState, RootState>, id: number) {
    const project = await ProjectService.getById(id);

    context.commit('setProject', project);
  },
};

export const mutations = {
  setProject(currentState: ProjectState, project: DetailProjectEntity): void {
    currentState.project = project;
  },
};
