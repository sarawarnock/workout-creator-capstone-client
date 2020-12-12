import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { WorkOutProvider } from './context';

ReactDOM.render(
  <BrowserRouter>
    <WorkOutProvider>
      <App />
    </WorkOutProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
