class UserEntity {
  id?: number;

  name?: string;

  email!: string;

  role?: string;

  imagePath?: string;
}

export default UserEntity;
