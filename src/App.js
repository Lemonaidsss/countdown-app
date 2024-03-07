import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './pages/main.jsx'; // Import the App component from its original location

ReactDOM.render(
  <React.StrictMode>
    <Countdown />
  </React.StrictMode>,
  document.getElementById('root')
);

export default Countdown;