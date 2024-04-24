import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import { Container } from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CityDetailPage from './pages/CityDetailPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Container maxWidth="lg">
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/city/:id' element={<CityDetailPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
