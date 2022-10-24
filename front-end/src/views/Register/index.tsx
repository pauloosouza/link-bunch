import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Form } from './styles';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

const loginFormSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required()
}).required();

type RegisterFormData = Yup.InferType<typeof loginFormSchema>;

export const Register = () => {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(loginFormSchema)
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      console.log('data', data);
      const res = await fetch('http://localhost:3001/users', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const responseError = await res.json();

        throw new Error(responseError.message);
      }

      setError('');

      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: '15px' }}>
        <Typography variant="h4">Cadastro</Typography>
      </Box>

      <Form>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label="Nome"
              sx={{ mb: '15px' }}
            />
          )}
        />

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
    </>
  );
};
