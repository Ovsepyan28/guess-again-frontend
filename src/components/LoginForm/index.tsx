'use client';

import { FormEvent, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/providers/AuthProvider';
import { LoginData, LoginErrorType } from '@/types/login';
import { Routes } from '@/types/routes';
import { User } from '@/types/user';
import { SOMETHING_WENT_WRONG } from '../constants';

export const LoginForm = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [email, setEmail] = useState<LoginData['email']>('');
  const [password, setPassword] = useState<LoginData['password']>('');
  const [errors, setErrors] = useState<LoginErrorType>('');
  const [success, setSuccess] = useState<string>('');

  const router = useRouter();
  const auth = useAuth();
  const loginData: LoginData = { email, password };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await auth.login(loginData);

      const user: User | null = auth.user;

      setSuccess(`Привет, ${user?.userName}! Вы успешно вошли в систему!`);
      setIsSuccess(true);
      setErrors('');
      setIsShow(true);

      setTimeout(() => router.push(Routes['ROOT']), 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 500) {
          setErrors(SOMETHING_WENT_WRONG);
        } else {
          setErrors(error.response?.data?.message);
        }
      } else {
        setErrors(SOMETHING_WENT_WRONG);
      }
      setSuccess('');
      setIsShow(true);
    }
  };

  const renderErrors = (errors: LoginErrorType) => {
    if (Array.isArray(errors)) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          {errors.map((error, index) => (
            <Alert key={index} severity='error'>
              {error}
            </Alert>
          ))}
        </Box>
      );
    }

    if (typeof errors === 'string') {
      return (
        <Box sx={{ mt: 1 }}>
          <Alert severity='error'>{errors}</Alert>
        </Box>
      );
    }

    return null;
  };
  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        {success && (
          <Collapse in={isShow}>
            <Alert severity='success'>{success}</Alert>
          </Collapse>
        )}
        {!isSuccess && (
          <>
            <Typography variant='h5'>Вход</Typography>
            <Collapse in={isShow}>{errors && renderErrors(errors)}</Collapse>
            <form
              onSubmit={handleLogin}
              style={{ width: '100%', marginTop: '16px' }}
            >
              <TextField
                size='small'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Email'
                value={email}
                onChange={(e) => {
                  setIsShow(false);
                  setEmail(e.target.value.trim());
                }}
              />
              <TextField
                size='small'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Пароль'
                type='password'
                value={password}
                helperText={
                  password.length < 6 || password.length > 16
                    ? 'Длина пароля от 6 до 16 символов'
                    : ''
                }
                onChange={(e) => {
                  setIsShow(false);
                  setPassword(e.target.value.trim());
                }}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
              >
                Войти
              </Button>
            </form>
            <Link href={Routes['REGISTRATION']} sx={{ mt: 1 }} underline='none'>
              <Typography>Регистрация</Typography>
            </Link>
          </>
        )}
      </Box>
    </Container>
  );
};
