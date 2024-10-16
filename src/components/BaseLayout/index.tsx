import { FC } from 'react';
import { Box } from '@mui/material';

import { Header } from './common/Header';

export type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};
