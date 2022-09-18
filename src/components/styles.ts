import { styled, LinearProgress } from '@mui/material';

export const Progress = styled(LinearProgress)(
  () => `
  &.MuiLinearProgress-determinate {
    background-color: #E5F5FF;

    span {
      background-color: #3968A6;
    }
  },
`
);
