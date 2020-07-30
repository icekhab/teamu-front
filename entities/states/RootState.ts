import AllProjectsState from '@/entities/states/AllProjectsState';
import UserState from '@/entities/states/UserState';
import SavingProjectState from '@/entities/states/SavingProjectState';
import RegistrationState from '@/entities/states/RegistrationState';
import LabelsState from '@/entities/states/LabelsState';

interface RootState {
  allProjects: AllProjectsState;
  user: UserState;
  registrationState: RegistrationState;
  labelsState: LabelsState;
  savingProjectState: SavingProjectState;
}

export default RootState;
