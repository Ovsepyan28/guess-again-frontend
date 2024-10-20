'use client';

import { FC, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  ButtonPropsColorOverrides,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { OverridableStringUnion } from '@mui/types'; // Убедитесь, что у вас импортирован нужный тип
import axios from 'axios';

import theme from '@/theme';
import {
  GameQuestionState,
  SubmitAnswerData,
  SubmitAnswerResponse,
} from '@/types/game';

interface GameProps {
  game: GameQuestionState;
  fetchGameData: () => void;
}

// Варианты цвета кнопки
type ColorOptions = OverridableStringUnion<
  | 'warning'
  | 'success'
  | 'error'
  | 'primary'
  | 'inherit'
  | 'secondary'
  | 'info',
  ButtonPropsColorOverrides
>;

export const Game: FC<GameProps> = ({ game, fetchGameData }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAnswer = async (answerId: string) => {
    if (selectedAnswer || isLoading) return {};

    setSelectedAnswer(answerId);

    const submitAnswerData: SubmitAnswerData = {
      gameId: game.gameId,
      questionId: game.questionId,
      selectedAnswerOptionId: answerId,
    };

    const response = await axios.post<SubmitAnswerResponse>(
      '/api/games/answer',
      submitAnswerData,
      {
        withCredentials: true,
      }
    );

    setCorrectAnswer(response.data.correctAnswerId);
    setTimeout(() => fetchGameData(), 1000);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const getColor = (answerId: string): ColorOptions => {
    // Ответ выбран, но результат еще не получен
    if (
      selectedAnswer && // Ответ выбран
      !correctAnswer && // Проверка еще не прошла
      answerId === selectedAnswer
    ) {
      return 'warning';
    }

    // Ответ выбран, ответ верный
    if (
      selectedAnswer && // Ответ выбран
      selectedAnswer === correctAnswer && // Ответ верный
      answerId === selectedAnswer
    ) {
      return 'success';
    }

    // Ответ выбран, ответ неверный
    if (
      selectedAnswer && // Ответ выбран
      selectedAnswer !== correctAnswer && // Ответ неверный
      answerId === selectedAnswer
    ) {
      return 'error';
    }

    // Ответ выбран, ответ неверный, подсветка верного ответа
    if (
      selectedAnswer && // Ответ выбран
      selectedAnswer !== correctAnswer && // Ответ неверный
      answerId === correctAnswer
    ) {
      return 'success';
    }

    return 'primary';
  };

  return (
    <Container maxWidth={'sm'} sx={{ mt: 2, mb: 2 }}>
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='body1'>
                Ваш счет: <strong>{game.score}</strong>
              </Typography>
              <Typography variant='body1'>
                Жизней: <strong>{game.lives}</strong>
              </Typography>
            </Box>
          }
          sx={{ p: 1 }}
        />
        <CardMedia
          component='img'
          sx={{
            height: {
              xs: 250,
              sm: 400,
            },
            [theme.breakpoints.between(450, 600)]: {
              height: 330,
            },
          }}
          image={game.imageUrl}
          title='кадр из фильма/сериала'
          onLoad={handleImageLoad}
        />
      </Card>
      <Box mt={2}>
        <Grid container spacing={2}>
          {game.answerOptions?.map((answer) => (
            <Grid size={6} key={answer.answerOptionId}>
              <LoadingButton
                variant='contained'
                fullWidth
                color={getColor(answer.answerOptionId)}
                sx={{ minHeight: 50, height: '100%' }}
                onClick={() => {
                  handleAnswer(answer.answerOptionId);
                }}
                loading={isLoading}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='caption'>{answer.title}</Typography>
                  <Typography
                    sx={{
                      fontSize: 10,
                      position: 'absolute',
                      bottom: 1,
                      right: 4,
                    }}
                  >
                    {answer.year}
                  </Typography>
                </Box>
              </LoadingButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
