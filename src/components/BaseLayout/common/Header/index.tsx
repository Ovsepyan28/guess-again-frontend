'use client';

import React, { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Link, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { clearUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Routes } from '@/types/routes';

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

  const [anchorMenuButton, setAnchorMenuButton] =
    React.useState<null | HTMLElement>(null);

  const isOpenMenu = Boolean(anchorMenuButton);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuButton(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenuButton(null);
  };

  const handleMenuItem = () => {
    handleLogout();
    setAnchorMenuButton(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              color='inherit'
              startIcon={<MenuIcon />}
              sx={{ position: 'absolute', left: 0, ml: 1 }}
              id='menu-button'
              onClick={handleClick}
              disabled={!user}
            >
              <Typography
                variant='button'
                component='div'
                sx={{ textAlign: 'center' }}
              >
                {user?.userName}
              </Typography>
            </Button>
            <Menu
              open={isOpenMenu}
              anchorEl={anchorMenuButton}
              onClose={handleClose}
              MenuListProps={{ disablePadding: true }}
            >
              <MenuItem onClick={handleMenuItem}>Выход</MenuItem>
            </Menu>

            <Link
              href='/'
              sx={{ color: 'white', display: 'inline-block', mb: 0.5 }}
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
