'use client';

import React, { FC, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

import { LoginData, LoginResponse } from '@/types/login';
import { publicRoutes, Routes } from '@/types/routes';
import { SignUpData } from '@/types/signUp';
import { User } from '@/types/user';

import { AuthContext } from './context';

export type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  const fetchUser = async () => {
    try {
      const response = await axios.get<LoginResponse>('/api/auth/whoami');
      setUser(response.data);
      if (publicRoutes.includes(pathName as Routes)) {
        router.replace(Routes['ROOT']);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          if (!publicRoutes.includes(pathName as Routes)) {
            router.replace(Routes['LOGIN']);
          }
        } else {
          console.log('Произошла неизвестная ошибка');
        }
      } else {
        console.log('Произошла неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (loginData: LoginData) => {
    const response = await axios.post<LoginResponse>(
      '/api/auth/login',
      loginData
    );

    setLoading(false);
    setUser(response.data);
  };

  const signUp = async (signUpData: SignUpData) => {
    const response = await axios.post<LoginResponse>(
      '/api/auth/signup',
      signUpData
    );

    setLoading(false);
    setUser(response.data);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signUp }}>
      {!loading ? children : <div>Загрузка...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен быть использован внутри AuthProvider');
  }
  return context;
};
