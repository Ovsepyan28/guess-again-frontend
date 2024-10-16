'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { NewGameRequest } from '@/types/game';

export const MainPage = () => {
  const router = useRouter();

  const handleClick = async () => {
    const response = await axios.post<NewGameRequest>('/api/games/new', {});

    const gameRoute = `/game/${response.data.gameId}`;

    router.push(gameRoute);
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
