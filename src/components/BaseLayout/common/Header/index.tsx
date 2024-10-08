'use client';

import { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

import { Routes } from '@/types/routes';

export const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {});
      router.push(Routes['ROOT']);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {/* <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Link
              href='/'
              sx={{ color: 'white', display: 'inline-block' }}
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
          {pathname !== Routes['LOGIN'] &&
            pathname !== Routes['REGISTRATION'] && (
              <Button color='inherit' onClick={handleLogout} variant='outlined'>
                Выход
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
