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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getUserName = () => {
  if (cookies.get('userName')) {
    return cookies.get('userName');
  }
  const userName = faker.name.findName();
  cookies.set('userName', userName);
  return userName;
};

const normalizeInitialData = (data) => {
  const { users, channels, messages } = data;
  return {
    ...data,
    users: users.reduce((acc, user) => ({
      ...acc,
      [user.id]: user,
    }), {}),
    channels: channels.reduce((acc, channel) => ({
      ...acc,
      [channel.id]: channel,
    }), {}),
    messages: messages.reduce((acc, message) => ({
      ...acc,
      [message.id]: message,
    }), {}),
  };
};

export default (initialData) => {
  const initialState = { ...normalizeInitialData(initialData), currentUser: getUserName() };

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );

  const socket = io();
  socket.on('newMessage', ({ data }) => store.dispatch(actions.addingMessage(data)));
  socket.on('newChannel', ({ data }) => store.dispatch(actions.addingChannel(data)));
  socket.on('renameChannel', ({ data }) => store.dispatch(actions.renamingChannel(data)));
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.removalChannel(data));
    store.dispatch(actions.removalMessages(data));
  });
  socket.on('userConnected', ({ data }) => store.dispatch(actions.addUser(data)));
  socket.on('userDisconnected', ({ data }) => store.dispatch(actions.deleteUser(data)));

  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.querySelector('.container'),
  );
};
