import { ActionContext } from 'vuex';
import MyProjectsState from '@/entities/states/MyProjectsState';
import RootState from '@/entities/states/RootState';
import ProjectService from '@/services/ProjectService';
import ProjectEntity from '@/entities/ProjectEntity';
import ProjectLabelEnum from '@/enums/ProjectLabelEnum';

export const state = (): MyProjectsState => ({
  publishedProjects: [],
  draftProjects: [],
  filter: {
    projectLabels: [],
    search: '',
  },
});

export const getters = {
  publishedProjects({ publishedProjects, filter: { search, projectLabels } }: MyProjectsState) {
    return [...publishedProjects]
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
  draftProjects({ draftProjects, filter: { search, projectLabels } }: MyProjectsState) {
    return [...draftProjects]
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
  async getPublishedProjects(context: ActionContext<MyProjectsState, RootState>) {
    const projects = await ProjectService.getMyPublished();

    context.commit('setPublishedProjects', projects);
  },

  async getDraftProjects(context: ActionContext<MyProjectsState, RootState>) {
    const projects = await ProjectService.getMyDraft();

    context.commit('setDraftProjects', projects);
  },

  async publishProject(context: ActionContext<MyProjectsState, RootState>, id: number) {
    await ProjectService.publish(id);
  },

  async draftProject(context: ActionContext<MyProjectsState, RootState>, id: number) {
    await ProjectService.draft(id);
  },
};

export const mutations = {
  setPublishedProjects(currentState: MyProjectsState, publishedProjects: ProjectEntity[]): void {
    currentState.publishedProjects = [...publishedProjects];
  },

  setDraftProjects(currentState: MyProjectsState, draftProjects: ProjectEntity[]): void {
    currentState.draftProjects = [...draftProjects];
  },

  setMySearchFilter(currentState: MyProjectsState, search: string): void {
    currentState.filter.search = search;
  },

  setMyProjectLabelFilter(currentState: MyProjectsState, labels: ProjectLabelEnum[]): void {
    currentState.filter.projectLabels = [...labels];
  },

  addMyProjectLabelFilter(currentState: MyProjectsState, label: ProjectLabelEnum): void {
    currentState.filter.projectLabels.push(label);
  },

  deleteMyProjectLabelFilter(currentState: MyProjectsState, label: ProjectLabelEnum): void {
    const index = currentState.filter.projectLabels.findIndex((x) => x === label);
    currentState.filter.projectLabels.splice(index, 1);
  },
};
