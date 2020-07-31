import ProjectEntity from '@/entities/ProjectEntity';
import ProjectsFilterEntity from '@/entities/ProjectsFilterEntity';

interface MyProjectsState {
  publishedProjects: ProjectEntity[];
  draftProjects: ProjectEntity[];
  filter: ProjectsFilterEntity;
}

export default MyProjectsState;
