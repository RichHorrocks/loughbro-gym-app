import React from 'react';
import Data from './components/Data';
import './App.css';

import GymState from './context/gym/GymState';

const App = () => {
  return (
    <GymState>
      <Data />
    </GymState>
  );
};

export default App;
