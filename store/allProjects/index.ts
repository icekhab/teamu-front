import { ActionContext } from 'vuex';
import AllProjectsState from '@/entities/states/AllProjectsState';
import RootState from '@/entities/states/RootState';
import ProjectService from '@/services/ProjectService';
import ProjectEntity from '@/entities/ProjectEntity';

export const state = (): AllProjectsState => ({
  projects: [],
});

export const actions : any = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAllProjects(context: ActionContext<AllProjectsState, RootState>, projectsFilter: any) {
    const projects = await ProjectService.get();

    context.commit('setProjects', projects);
  },
};

export const mutations = {
  setProjects(currentState: AllProjectsState, projects: ProjectEntity[]): void {
    currentState.projects = { ...projects };
  },
};
