import Quiz from "./components/Quiz"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicial from "./components/Inicial";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/inicial" element={<Inicial/>} />
      </Routes>
    </Router>
  );
};

export default App;
