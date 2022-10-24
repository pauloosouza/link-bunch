import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../../views/Dashboard';
import { Links } from '../../views/Links';

import { Login } from '../../views/Login';
import { Register } from '../../views/Register';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user/:id/links" element={<Links />} />
    </Routes>
  );
}
