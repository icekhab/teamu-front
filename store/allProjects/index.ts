import { ActionContext } from 'vuex';
import AllProjectsState from '@/entities/states/AllProjectsState';
import RootState from '@/entities/states/RootState';
import ProjectService from '@/services/ProjectService';
import ProjectEntity from '@/entities/ProjectEntity';
import ProjectLabelEnum from '@/enums/ProjectLabelEnum';

export const state = (): AllProjectsState => ({
  projects: [],
  filter: {
    projectLabels: [],
    search: '',
  },
});

export const getters = {
  projects({ projects, filter: { search, projectLabels } }: AllProjectsState) {
    return [...projects]
      // @ts-ignore
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .filter((project) => {
        const searchLowerCase = search && search.toLowerCase();
        const isSearchIncludes = !searchLowerCase
            || project.description.toLowerCase().includes(searchLowerCase)
            || project.name.toLowerCase().includes(searchLowerCase);

        const isLabelsIncludes = !projectLabels.length
            || project.labels.some((x) => projectLabels.includes(x.title));

        return isSearchIncludes && isLabelsIncludes;
      });
  },
};

export const actions : any = {
  async getAllProjects(context: ActionContext<AllProjectsState, RootState>) {
    const projects = await ProjectService.get();

    context.commit('setProjects', projects);
  },
};

export const mutations = {
  setProjects(currentState: AllProjectsState, projects: ProjectEntity[]): void {
    currentState.projects = [...projects];
  },

  setSearchFilter(currentState: AllProjectsState, search: string): void {
    console.log(search);
    currentState.filter.search = search;
  },

  addProjectLabelFilter(currentState: AllProjectsState, label: ProjectLabelEnum): void {
    currentState.filter.projectLabels.push(label);
  },

  deleteProjectLabelFilter(currentState: AllProjectsState, label: ProjectLabelEnum): void {
    const index = currentState.filter.projectLabels.findIndex((x) => x === label);
    currentState.filter.projectLabels.splice(index, 1);
  },
};
