import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';

import './assets/styles/core.css';
import './assets/styles/normalize.css';
import configureStore from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
    <App />
    </Provider>
  </React.StrictMode>,
);
