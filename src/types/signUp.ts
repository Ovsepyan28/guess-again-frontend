import { User } from './user';

export interface SignUpData {
  email: User['email'];
  userName: User['userName'];
  password: string;
}
