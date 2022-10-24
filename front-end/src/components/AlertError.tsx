import {
  Alert,
  AlertTitle,
  Box,
  Collapse,
  IconButton,
  Snackbar,
  Typography
} from '@mui/material';
import { Progress } from './styles';

import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from 'react';

type Props = {
  message: string;
};

export default function AlertError({ message }: Props) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(1);

  const time = 600;

  useEffect(() => {
    if (progress <= 6) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => oldProgress + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [progress]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={time * 10}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Box>
        <Alert
          severity="error"
          sx={{
            my: '16px',
            alignItems: 'center',
            background: '#E5F5FF',
            mb: 0
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              component={'span'}
              sx={{
                fontSize: '14px',
                color: '#1C3B77'
              }}
            >
              <AlertTitle sx={{ m: 0 }}>{message}</AlertTitle>
            </Typography>
          </Box>
        </Alert>

        <Progress
          variant="determinate"
          value={((progress * 100) / time) * 100}
        />
      </Box>
    </Snackbar>
  );
}
