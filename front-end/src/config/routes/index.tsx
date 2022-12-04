import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Dashboard } from '../../views/Dashboard';
import { Links } from '../../views/Links';

import { Login } from '../../views/Login';
import { Register } from '../../views/Register';

export function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState('');

  useEffect(() => {
    const itsAlreadyAuthenticated = ['/', '/register'];

    if (token && itsAlreadyAuthenticated.includes(location.pathname)) {
      navigate('/dashboard');
    }
  }, [token, location.pathname, navigate]);

  useEffect(() => {
    const userToken = sessionStorage.getItem('accessToken') || '';

    if (!userToken) navigate('/');

    setToken(userToken);
  }, [navigate, token]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user/:id/links" element={<Links />} />
    </Routes>
  );
}
