'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { CircularProgress, Container } from '@mui/material';
import axios from 'axios';

import { Game } from '@/components/Game';
import { GameResult } from '@/components/GameResult';
import { Game as GameType, GameQuestionState, GameStatus } from '@/types/game';

interface GamePageProps {
  params: { gameId: GameType['id'] };
}

const GamePage: FC<GamePageProps> = ({ params }) => {
  const [game, setGame] = useState<GameQuestionState | null>(null);

  const fetchGameData = useCallback(async () => {
    setGame(null);
    try {
      const response = await axios.get<GameQuestionState>(
        `/api/games/${params.gameId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setGame(response.data); // Обновляем состояние игры
    } catch (error) {
      console.error('Ошибка при загрузке данных игры:', error);
    } finally {
    }
  }, [params.gameId]);

  // Первичная загрузка данных игры
  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]);

  if (!game) {
    return (
      <Container maxWidth={'xs'} sx={{ mt: 2, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (game.status === GameStatus['IN_PROGRESS']) {
    return <Game game={game} fetchGameData={fetchGameData} />;
  }

  if (game.status === GameStatus['COMPLETED']) {
    return <GameResult game={game} />;
  }
};

export default GamePage;
