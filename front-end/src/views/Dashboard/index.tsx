import {
  Alert,
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import { Form } from './styles';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toPattern } from 'vanilla-masker';

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/AlternateEmail';
import { validatePhone, validateURL } from '../../helpers/validations';
import { Link } from 'react-router-dom';

const linkValidation = Yup.string().test(
  'url',
  'Por favor, insira um link correto.',
  (value) => validateURL(value)
);

const phoneValidation = Yup.string().test(
  'phone',
  'Por favor, insira um telefone correto.',
  (value) => validatePhone(value)
);

const loginFormSchema = Yup.object({
  email: Yup.string().email('Por favor, insira um e-mail correto.'),
  whatsapp: phoneValidation,
  instagram: linkValidation,
  facebook: linkValidation,
  twitter: linkValidation
}).required();

type LinksFormData = Yup.InferType<typeof loginFormSchema>;

export const Dashboard = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    setUserId(userId ?? '');
  }, []);

  const { handleSubmit, control } = useForm<LinksFormData>({
    defaultValues: {
      email: '',
      facebook: '',
      instagram: '',
      twitter: '',
      whatsapp: ''
    },
    resolver: yupResolver(loginFormSchema)
  });

  async function onSubmit(data: LinksFormData) {
    try {
      const userId = sessionStorage.getItem('userId');

      const links = Object.entries(data).map((item) => {
        if (item[0] === 'whatsapp') {
          return {
            type: item[0],
            link: item[1] && toPattern(item[1], '99999999999')
          };
        }

        return { type: item[0], link: item[1] };
      });

      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links })
      });

      if (!res.ok) {
        const responseError = await res.json();

        throw new Error(responseError.message);
      }

      setSuccess('Links criados/atualizados com sucesso');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: '15px' }}>
        <Typography variant="h4">Adicionar links</Typography>
        <Link to={`/user/${userId}/links`}>
          <Typography variant="caption">Veja sua página de links</Typography>
        </Link>
      </Box>

      {error && (
        <Alert sx={{ my: '20px' }} severity="error">
          {error}
        </Alert>
      )}

      {success && (
        <Alert sx={{ my: '20px' }} severity="success">
          {success}
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              error={!!error?.message}
              helperText={error?.message}
              onChange={onChange}
              value={value}
              label="E-mail"
              type="email"
              sx={{ mb: '15px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        <Controller
          name={'whatsapp'}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              error={!!error?.message}
              helperText={error?.message}
              sx={{ mb: '15px' }}
              onChange={(input) => {
                onChange(toPattern(input.target.value, '(99) 99999-9999'));
              }}
              type="text"
              value={value}
              label={'Whatsapp'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WhatsAppIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        <Controller
          name={'instagram'}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              error={!!error?.message}
              helperText={error?.message}
              sx={{ mb: '15px' }}
              onChange={onChange}
              type="text"
              value={value}
              label={'Instagram'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InstagramIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        <Controller
          name={'facebook'}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              error={!!error?.message}
              helperText={error?.message}
              sx={{ mb: '15px' }}
              onChange={onChange}
              type="text"
              value={value}
              label={'Facebook'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FacebookIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        <Controller
          name={'twitter'}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              error={!!error?.message}
              helperText={error?.message}
              sx={{ mb: '15px' }}
              onChange={onChange}
              type="text"
              value={value}
              label={'Twitter'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TwitterIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Cadastrar
        </Button>
      </Form>
    </>
  );
};
