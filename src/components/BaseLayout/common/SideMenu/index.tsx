import { FC, useState } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, ListSubheader } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { User } from '@/types/user';

interface SideMenuProps {
  user: User | null;
  logout: () => void;
}
export const SideMenu: FC<SideMenuProps> = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 200 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        disablePadding
        subheader={
          <ListSubheader component='div' color='primary'>
            {user?.userName}
          </ListSubheader>
        }
      >
        {user && (
          <ListItem sx={{ pt: 0, pb: 0 }}>
            <ListItemText
              primary='Ваш рекорд:'
              secondary={`${user.maxScore} балов`}
            />
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary='Top10' />
          </ListItemButton>
        </ListItem>
        {user && (
          <>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Выход' />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} sx={{ color: 'inherit' }}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};
