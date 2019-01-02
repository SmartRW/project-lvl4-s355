import '@babel/polyfill';
import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import Root from './components/Root';

// eslint-disable-next-line no-underscore-dangle
// const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
// const devtoolsMiddleware = ext && ext();

export default (data) => {
  const getUserName = () => {
    if (cookies.get('userName')) {
      return cookies.get('userName');
    }
    const userName = faker.name.findName();
    cookies.set('userName', userName);
    return userName;
  };

  const initialState = { ...data, currentUser: getUserName() };

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk),
      // devtoolsMiddleware,
    ),
  );
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.querySelector('.container'),
  );
};
