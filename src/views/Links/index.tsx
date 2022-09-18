import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import { User } from '../../services/api/types';

export const Links = () => {
  const [error, setError] = React.useState('');
  const [user, setUser] = React.useState({} as User);

  React.useEffect(() => {
    (async () => {
      try {
        const userId = sessionStorage.getItem('userId');

        const res = await fetch(`/api/users/${userId}`);

        if (!res.ok) {
          const responseError = await res.json();

          throw new Error(responseError.message);
        }

        const resData = await res.json();
        console.log('sasasas', resData);
        setUser(resData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    })();
  }, []);

  return (
    <>
      {user && !!user?.links?.length && (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
        </List>
      )}
    </>
  );
};
