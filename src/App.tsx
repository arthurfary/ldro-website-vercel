import React, { useEffect, useState } from 'react';
import './index.css'
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home'
import BackendPage from './pages/backEndPages/backend';
import Login from './pages/login';


function App() {
  const [token, setToken] = useState(null);


  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token))
    }

    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        setToken(parsedToken); // Set token only if parsing is successful
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, [token, setToken]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login token={token} setToken={setToken} />} />
          <Route path='/backend' element={token ? <BackendPage /> : null} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
