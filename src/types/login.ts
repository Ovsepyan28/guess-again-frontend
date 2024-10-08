import { User } from './user';

export interface LoginData {
  email: User['email'];
  password: string;
}

export interface LoginResponse {
  id: User['id'];
  email: User['email'];
  role: User['role'];
  name: User['name'];
  maxScore: User['maxScore'];
}

export type ErrorType = string | string[];
