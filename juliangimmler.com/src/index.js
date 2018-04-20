import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk'
import reducers from './reducers';
import App from './App';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

ReactDOM.render(
  <App store={createStoreWithMiddleware(reducers)} />,
  document.getElementById('root')
);
