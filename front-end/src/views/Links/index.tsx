import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Link
} from '@mui/material';

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/AlternateEmail';

type Link = {
  _id: string;
  type: string;
  link: string;
};

type User = {
  name: string;
  email: string;
  password: string;
  links: Link[];
};

export const Links = () => {
  const [error, setError] = React.useState('');
  const [user, setUser] = React.useState({} as User);

  React.useEffect(() => {
    (async () => {
      try {
        const userId = sessionStorage.getItem('userId');

        const res = await fetch(`http://localhost:3001/users/${userId}`, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' }
        });

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

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  function handleWithIcon(type: string) {
    const icons: Record<string, any> = {
      email: <EmailIcon />,
      whatsapp: <WhatsAppIcon />,
      instagram: <InstagramIcon />,
      twitter: <TwitterIcon />,
      facebook: <FacebookIcon />
    };

    return icons[type] || <ImageIcon />;
  }

  function handleWithLink(item: Link) {
    const links: Record<string, any> = {
      email: `mailto:${item.link}`,
      whatsapp: `https://wa.me/55${item.link}`,
      instagram: item.link,
      twitter: item.link,
      facebook: item.link
    };

    return links[item.type] || item.link;
  }

  return (
    <Box
      sx={{
        backgroundColor: '#F1F1F1',
        height: '100vh',
        m: 0,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container>
        {user && !!user?.links?.length && (
          <Card sx={{ minWidth: 275 }}>
            <CardHeader title={`${user.name} links`} />
            <CardContent>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper'
                }}
              >
                {user.links.map((item) => (
                  <Link
                    key={item._id}
                    href={handleWithLink(item)}
                    underline="none"
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{handleWithIcon(item.type)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.type} secondary={item.link} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};
