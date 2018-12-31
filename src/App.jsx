import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Root from './components/Root';

// import io from 'socket.io-client';

const getInitialState = data => data;
// eslint-disable-next-line no-underscore-dangle
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;

export default (data) => {
  cookies.set('userName', faker.name.findName());

  const store = createStore(
    state => state,
    getInitialState(data),
    reduxDevtools && reduxDevtools(),
  );
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.querySelector('.container'),
  );
};
