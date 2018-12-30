import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Channels from './components/Channels';

// import io from 'socket.io-client';

const getInitialState = data => ({
  channels: [...data.channels.map((c) => {
    const { id, name, removable } = c;
    return {
      id,
      name,
      removable,
    };
  })],
});

export default (data) => {
  cookies.set('userName', faker.name.findName());

  const store = createStore(state => state, getInitialState(data));

  render(
    <Provider store={store}>
      <div className="row min-vh-50">
        <Channels />
        <div className="col-md-9 bg-light text-dark" />
      </div>
    </Provider>,
    document.querySelector('.container'),
  );
};
