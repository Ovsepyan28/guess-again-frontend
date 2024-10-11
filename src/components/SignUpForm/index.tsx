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

import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { LoginErrorType, LoginResponse } from '@/types/login';
import { Routes } from '@/types/routes';
import { SignUpData } from '@/types/signUp';
import { User } from '@/types/user';
import { PASSWORDS_DO_NOT_MATCH, SOMETHING_WENT_WRONG } from '../constants';

export const SignUpForm = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [email, setEmail] = useState<SignUpData['email']>('');
  const [userName, setUserName] = useState<SignUpData['userName']>('');
  const [password, setPassword] = useState<SignUpData['password']>('');
  const [confirmPassword, setConfirmPassword] =
    useState<SignUpData['password']>('');
  const [errors, setErrors] = useState<LoginErrorType>('');
  const [success, setSuccess] = useState<string>('');

  const router = useRouter();
  const dispatch = useAppDispatch();
  const signUpData: SignUpData = { email, password, userName };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors(PASSWORDS_DO_NOT_MATCH);
      setIsShow(true);
      return;
    }

    try {
      const response = await axios.post<LoginResponse>(
        '/api/auth/signup',
        signUpData
      );

      const user: User = response.data;

      if (response.status === 201) {
        setSuccess(`Привет, ${user.userName}! Вы успешно зарегистрировались!`);
        setIsSuccess(true);
        setErrors('');
        setIsShow(true);
      }

      dispatch(setUser(user));
      setTimeout(() => router.push(Routes['ROOT']), 500);
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

  const isSignUpButtonEnabled = () => {
    return password === confirmPassword;
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
            <Typography variant='h5'>Регистрация</Typography>
            <Collapse in={isShow}>{errors && renderErrors(errors)}</Collapse>
            <form
              onSubmit={handleSignUp}
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
                label='Имя'
                helperText={
                  userName.length < 2 ? 'Минимальная длина имени 2 символа' : ''
                }
                value={userName}
                onChange={(e) => {
                  setIsShow(false);
                  setUserName(e.target.value.trim());
                }}
              />
              <TextField
                size='small'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Пароль'
                helperText={
                  password.length < 6 || password.length > 16
                    ? 'Длина пароля от 6 до 16 символов'
                    : ''
                }
                type='password'
                value={password}
                onChange={(e) => {
                  setIsShow(false);
                  setPassword(e.target.value.trim());
                }}
              />
              <TextField
                size='small'
                variant='outlined'
                margin='normal'
                required
                error={!isSignUpButtonEnabled()}
                helperText={
                  isSignUpButtonEnabled() ? '' : 'Введенные пароли не совпадают'
                }
                fullWidth
                label='Повторите пароль'
                type='password'
                value={confirmPassword}
                onChange={(e) => {
                  setIsShow(false);
                  setConfirmPassword(e.target.value.trim());
                }}
              />
              <Button
                type='submit'
                variant='contained'
                disabled={!isSignUpButtonEnabled()}
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
              >
                Зарегистрироваться
              </Button>
            </form>
            <Link href={Routes['LOGIN']} sx={{ mt: 1 }} underline='none'>
              <Typography>Вход</Typography>
            </Link>
          </>
        )}
      </Box>
    </Container>
  );
};
