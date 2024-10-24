'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { NewGameRequest } from '@/types/game';
import { Routes } from '@/types/routes';
import { SOMETHING_WENT_WRONG } from '../constants';

export const MainPage = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await axios.post<NewGameRequest>('/api/games/new', {
        withCredentials: true,
      });

      const gameRoute = `/game/${response.data.gameId}`;

      router.push(gameRoute);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          router.push(Routes['LOGIN']);
        } else {
          console.log(error.response?.data?.message);
        }
      } else {
        console.log(SOMETHING_WENT_WRONG);
      }
    }
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Button
          variant='contained'
          fullWidth
          size='large'
          onClick={handleClick}
        >
          <Typography>НОВАЯ ИГРА</Typography>
        </Button>
      </Box>
    </Container>
  );
};
