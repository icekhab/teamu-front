import { ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import ProjectService from '@/services/ProjectService';
import SavingProjectState from '@/entities/states/SavingProjectState';
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import LabelEntity from '@/entities/LabelEntity';
import LinkEntity from '@/entities/LinkEntity';
import VacancyEntity from '@/entities/VacancyEntity';
import LabelService from '@/services/LabelService';
import LinkService from '@/services/LinkService';
import VacancyService from '@/services/VacancyService';
import FileEntity from '@/entities/FileEntity';

export const state = (): SavingProjectState => ({
  project: {
    id: 0,
    description: '',
    name: '',
    imagePath: '',
  },
  labels: [],
  links: [],
  vacancies: [],
});

export const actions : any = {
  async getProject(context: ActionContext<SavingProjectState, RootState>, projectId: number) {
    const project = await ProjectService.getById(projectId);

    context.commit('setProject', project);
    context.commit('setLabels', project.labels);
    context.commit('setLinks', project.links);
    context.commit('setVacancies', project.vacancy);
  },

  async saveProject(
    context: ActionContext<SavingProjectState, RootState>,
    project: DescriptionProjectEntity,
  ) {
    // const { file, project: projectInfo } = context.state;
    // console.log('projectInfo', JSON.stringify(projectInfo));
    // console.log('project', project);

    if (project.id) {
      await ProjectService.update(project);

      context.commit('setProject', project);
    } else {
      const id = await ProjectService.create(project);

      context.commit('setProject', { ...project, id });
    }
  },

  async saveLabels(
    context: ActionContext<SavingProjectState, RootState>,
    labels: LabelEntity[],
  ) {
    await LabelService.saveLabels(context.state.project.id, labels);

    context.commit('setLabels', labels);
  },

  async saveLinks(
    context: ActionContext<SavingProjectState, RootState>,
    newLinks: LinkEntity[],
  ) {
    const {
      project: { id: projectId },
      links: oldLinks,
    } = context.state;

    const savingPromises = newLinks.map(async (link) => {
      if (link.id) {
        await LinkService.update(projectId, link);

        return link;
      }

      const id = await LinkService.create(projectId, link);

      return { ...link, id };
    });

    const deletingPromises = oldLinks
      .filter((oldLink) => !newLinks.some(
        ({ id }) => id === oldLink.id,
      ))
      .map(({ id }) => LinkService.delete(projectId, id));

    const links = await Promise.all(savingPromises);

    if (deletingPromises.length) await Promise.all(deletingPromises);

    context.commit('setLinks', links);
  },

  async saveVacancies(
    context: ActionContext<SavingProjectState, RootState>,
    newVacancies: VacancyEntity[],
  ) {
    const {
      project: { id: projectId },
      vacancies: oldVacancies,
    } = context.state;

    const savingPromises = newVacancies.map(async (vacancy) => {
      if (vacancy.id) {
        await VacancyService.update(projectId, vacancy);

        return vacancy;
      }

      const id = await VacancyService.create(projectId, vacancy);

      return { ...vacancy, id };
    });

    const deletingPromises = oldVacancies
      .filter((oldLink) => !newVacancies.some(
        ({ id }) => id === oldLink.id,
      ))
      .map(({ id }) => VacancyService.delete(projectId, id));

    const vacancies = await Promise.all(savingPromises);

    if (deletingPromises.length) await Promise.all(deletingPromises);

    context.commit('setVacancies', vacancies);
  },

  async saveImage(
    context: ActionContext<SavingProjectState, RootState>,
  ) {
    const { project, file } = context.state;

    if (file) {
      const imagePath = await ProjectService.uploadImg(file.file);
      context.commit('setProject', { ...project, imagePath });
    }
  },
};

export const mutations = {
  setProject(currentState: SavingProjectState, project: DescriptionProjectEntity): void {
    currentState.project = { ...project };
  },

  setLabels(currentState: SavingProjectState, labels: LabelEntity[]): void {
    currentState.labels = [...labels];
  },

  setLinks(currentState: SavingProjectState, links: LinkEntity[]): void {
    currentState.links = [...links];
  },

  setVacancies(currentState: SavingProjectState, vacancies: VacancyEntity[]): void {
    currentState.vacancies = [...vacancies];
  },

  setFileForProject(currentState: SavingProjectState, file: FileEntity): void {
    currentState.file = file;
  },
};
