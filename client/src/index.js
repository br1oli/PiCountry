import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // para poder asignarle el store, porque redux no me va a dar pelota
import { store } from './STORE'
import axios from 'axios';

import dotenv from "dotenv";
// dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "https://picountry-production.up.railway.app/";


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
