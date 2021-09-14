// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

// my components
import './index.css';
import App from './app/App';
import loadAnimation from "./features/home/LoadingToHomeAnimation.js";
import { store } from "./app/store.js";

// others
import reportWebVitals from './reportWebVitals';

// loadAnimation();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
