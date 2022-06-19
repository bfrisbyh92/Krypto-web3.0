import React from 'react';
import ReactDOM from 'react-dom/client';

import {TransactionProvider} from './context/TransactionContext'
// ^^^ Importing our React useContext/state ^^^

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TransactionProvider>
        <App />
    </TransactionProvider>

    // ^^^ Wrapping the app with useContext/State from src/context/TransactionContext.jsx ^^^

);


