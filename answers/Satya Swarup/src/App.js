import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import LiveTicker from './LiveTicker';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/liveticker" element={<LiveTicker />} /> 
      </Routes>
    </Router>
  );
}

export default App;