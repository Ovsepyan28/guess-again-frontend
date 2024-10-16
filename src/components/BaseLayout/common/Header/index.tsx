'use client';

import React, { FC } from 'react';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { clearUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Routes } from '@/types/routes';
import { SideMenu } from '../SideMenu';

export const Header: FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {});

      dispatch(clearUser());

      router.push(Routes['LOGIN']);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <SideMenu user={user} logout={handleLogout} />             
          <Link
            href='/'
            sx={{
              color: 'white',
              display: 'inline-block',
              mb: 0.5,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            underline='none'
          >
            <Typography
              variant='h5'
              component='div'
              sx={{ textAlign: 'center' }}
            >
              GuessAgain
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
