import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from '../pages/Catalog';

import Login from '../pages/Login';

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/images" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SignRoutes;
