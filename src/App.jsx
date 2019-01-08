import '@babel/polyfill';
import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import io from 'socket.io-client';
import reducers from './reducers';
import Root from './components/Root';
import * as actions from './actions';

// eslint-disable-next-line no-underscore-dangle
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolsMiddleware = ext && ext();

const getUserName = () => {
  if (cookies.get('userName')) {
    return cookies.get('userName');
  }
  const userName = faker.name.findName();
  cookies.set('userName', userName);
  return userName;
};

export default (initialData) => {
  const initialState = { ...initialData, currentUser: getUserName() };

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk),
      devtoolsMiddleware,
    ),
  );

  const socket = io();
  socket.on('newMessage', ({ data }) => store.dispatch(actions.updateMessages(data)));
  socket.on('newChannel', ({ data }) => store.dispatch(actions.updateChannels(data)));

  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.querySelector('.container'),
  );
};
