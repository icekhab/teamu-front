import UserEntity from '@/entities/UserEntity';
import UsersFilterEntity from '@/entities/UsersFilterEntity';

interface AllUsersState {
  users: UserEntity[];
  filter: UsersFilterEntity;
}

export default AllUsersState;
