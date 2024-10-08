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
import { usePathname, useRouter } from 'next/navigation';

export const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Link href='/' sx={{ color: 'white', display: 'inline-block' }}>
              <Typography
                variant='h5'
                component='div'
                sx={{ textAlign: 'center' }}
              >
                GuessAgain
              </Typography>
            </Link>
          </Box>
          {pathname !== '/login' && (
            <Button color='inherit' onClick={() => router.push('/login')}>
              Вход
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
