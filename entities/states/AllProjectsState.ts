import ProjectEntity from '@/entities/ProjectEntity';
import ProjectsFilterEntity from '@/entities/ProjectsFilterEntity';

interface AllProjectsState {
  projects: ProjectEntity[];
  filter: ProjectsFilterEntity;
}

export default AllProjectsState;
