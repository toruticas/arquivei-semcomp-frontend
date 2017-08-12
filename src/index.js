import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App';
import reducers from './store/reducers'

const initialState = window.__INITIAL_STATE__
if (initialState.list && initialState.list.length) {
  initialState.listMirror = JSON.parse(JSON.stringify(initialState.list))
}

const store = createStore(reducers, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
