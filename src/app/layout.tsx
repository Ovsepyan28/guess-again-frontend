import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import './globals.css';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
export const metadata: Metadata = {
  title: 'GuessAgain',
  description: 'Created by Ovsepyan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
