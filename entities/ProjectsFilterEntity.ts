import ProjectLabelEnum from '@/enums/ProjectLabelEnum';

class ProjectsFilterEntity {
  search!: string;

  projectLabels!: ProjectLabelEnum[];
}

export default ProjectsFilterEntity;
