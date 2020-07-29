import AllProjectsState from '@/entities/states/AllProjectsState';
import UserState from '@/entities/states/UserState';

interface RootState {
  allProjects: AllProjectsState;
  user: UserState;
}

export default RootState;
