'use client';

import { FC, useEffect, useState } from 'react';
import {
  Card,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from '@mui/material';
import axios from 'axios';

import { TopPlayer } from '@/types/top10';

export const Top10: FC = () => {
  const [top, setTop] = useState<TopPlayer[] | null>(null);

  const listItems = () =>
    top?.map((user) => {
      return (
        <ListItem
          disablePadding
          key={user.userName}
          component='div'
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant='body1'>{user.userName}</Typography>
          <Typography variant='body1'>
            <strong>{user.maxScore}</strong> балов
          </Typography>
        </ListItem>
      );
    });

  const fetchTop10 = async () => {
    try {
      const response = await axios.get<TopPlayer[]>('/api/users/top10');
      setTop(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке данных игры:', error);
    }
  };

  useEffect(() => {
    fetchTop10();
  }, []);

  if (!top) {
    return (
      <Container maxWidth={'xs'} sx={{ mt: 2, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (top.length === 0) {
    return (
      <Container maxWidth={'sm'} sx={{ mt: 2, textAlign: 'center' }}>
        <Typography>Список чемпионов пуст, станьте первым!</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={'xs'} sx={{ mt: 2, mb: 2 }}>
      <Card sx={{ pl: 2, pr: 2, pb: 1 }}>
        <List
          disablePadding
          subheader={
            <ListSubheader
              component='div'
              color='primary'
              sx={{ textAlign: 'center' }}
            >
              Список лучших игорьков
            </ListSubheader>
          }
        >
          {listItems()}
        </List>
      </Card>
    </Container>
  );
};
