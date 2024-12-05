import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js'; 
import NotHome from './pages/NotHome/NotHome';

const Home = () => <h1>Home Page</h1>;

const App = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/nothome" element={<NotHome />} />
      </Routes>
    </Router>
  );
};

export default App;



