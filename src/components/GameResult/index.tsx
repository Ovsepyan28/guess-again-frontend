'use client';

import { FC } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { GameQuestionState, NewGameRequest } from '@/types/game';
import { Routes } from '@/types/routes';

interface GameResultProps {
  game: GameQuestionState;
}

export const GameResult: FC<GameResultProps> = ({ game }) => {
  const router = useRouter();

  const handleClickNewGame = async () => {
    const response = await axios.post<NewGameRequest>('/api/games/new', {});

    const gameRoute = `/game/${response.data.gameId}`;

    router.push(gameRoute);
  };

  const handleClickMain = () => {
    router.push(Routes['ROOT']);
  };

  return (
    <Container maxWidth={'xs'} sx={{ mt: 2, mb: 2 }}>
      <Card sx={{ pb: 1 }}>
        <CardContent>
          <Typography sx={{ textAlign: 'center' }}>
            Игра завершена со счетом <strong>{game.score}</strong> баллов
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-around' }}>
          <Button variant='contained' onClick={handleClickNewGame}>
            Новая игра
          </Button>
          <Button variant='contained' onClick={handleClickMain}>
            Главная
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
