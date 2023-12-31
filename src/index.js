import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './Board';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>Minesweeper</h1>
    <Board />
  </React.StrictMode>
);
