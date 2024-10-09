'use client';

import { createContext } from 'react';

import { LoginData } from '@/types/login';
import { SignUpData } from '@/types/signUp';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (signUpData: SignUpData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
