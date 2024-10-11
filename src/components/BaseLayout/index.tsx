import { FC } from 'react';
import { Box } from '@mui/material';

import StoreProvider from '@/providers/StoreProvider';

import { Header } from './common/Header';

export type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box>
      <StoreProvider>
        <Header />
        {children}
      </StoreProvider>
    </Box>
  );
};
