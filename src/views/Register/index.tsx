import React from 'react';
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Form } from './styles';

export const Login = () => {
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
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
  );
};
