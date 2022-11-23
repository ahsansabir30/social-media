import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
//import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
// import thunk from 'redux-thunk';
import { reducers } from './reducers';
import App from './App';

// redux thunk is pre-configured with configur store
// purpose of thunk, is to wrap a function to delay/ perform its calculation, i.e. to think
const store = configureStore({
  reducer: reducers,
})
// const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
  </React.StrictMode>
);