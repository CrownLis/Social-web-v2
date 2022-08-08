import React from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from './store/store';
import { Provider } from 'react-redux';

import App from './App';

import './assets/styles/core.css';
import './assets/styles/normalize.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={configureStore()}>
    <App />
    </Provider>
);
