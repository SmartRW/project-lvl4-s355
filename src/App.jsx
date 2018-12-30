import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Root from './components/Root';

// import io from 'socket.io-client';

const getInitialState = data => data;

export default (data) => {
  cookies.set('userName', faker.name.findName());

  const store = createStore(state => state, getInitialState(data));
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.querySelector('.container'),
  );
};
