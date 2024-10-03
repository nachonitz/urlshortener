interface BaseUser {
  email: string;
  fullname: string;
  age: number;
  username: string;
  country: string;
}

export interface CreateUserDto extends BaseUser {
  password: string;
}
