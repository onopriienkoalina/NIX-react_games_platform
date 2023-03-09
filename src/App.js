import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Home from './components/Home';
import CoinGame from './components/CoinGame';
import DoorGame from './components/DoorGame';
import NumberGame from './components/NumberGame';
import Winner from './components/Winner';
import TryAgain from './components/TryAgain';
import Header from "./components/Header";
import "./App.css";

const App = () => {

  return (
    <Router>
      <>
        <Routes>
          <Route path="/login" element={<Form />} />
          <Route path="/" element={<Header />}>
            <Route path="/games" element={<Home />} />
            <Route path="/coin-game" element={<CoinGame />} />
            <Route path="/door-game" element={<DoorGame />} />
            <Route path="/number-game" element={<NumberGame />} />
            <Route path="/winner" element={<Winner />} />
            <Route path="/try-again" element={<TryAgain />} />
          </Route>
        </Routes>
      </>
    </Router>
  );
};

export default App;
