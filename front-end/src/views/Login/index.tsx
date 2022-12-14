import {
  Alert,
  Box,
  Button,
  Divider,
  Typography,
  TextField
} from '@mui/material';
import { Form } from './styles';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginFormSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required()
}).required();

type LoginFormData = Yup.InferType<typeof loginFormSchema>;

export const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginFormSchema)
  });

  async function onSubmit(data: LoginFormData) {
    sessionStorage.setItem('userId', '');
    sessionStorage.setItem('accessToken', '');

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const responseError = await res.json();

        throw new Error(responseError.message);
      }

      setError('');

      const resData = await res.json();

      sessionStorage.setItem('accessToken', resData.accessToken);
      sessionStorage.setItem('userId', resData.userId);

      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: '15px' }}>
        <Typography variant="h4">LinkBunch</Typography>
      </Box>

      {error && (
        <Alert sx={{ my: '20px' }} severity="error">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label="E-mail"
              sx={{ mb: '15px' }}
            />
          )}
        />
        <Controller
          name={'password'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ mb: '15px' }}
              onChange={onChange}
              type="password"
              value={value}
              label={'Senha'}
            />
          )}
        />

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Form>

      <Divider sx={{ my: ' 10px' }} />

      <Alert severity="info">
        N??o tem uma conta? <Link to="/register">Fa??a seu cadastro</Link>
      </Alert>
    </>
  );
};
