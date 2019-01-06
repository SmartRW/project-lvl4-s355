import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const messages = handleActions({
  [actions.updateMessages]: (state, { payload: { attributes } }) => [
    ...state,
    attributes,
  ],
}, []);

const messageAddingSucceedeed = handleActions({
  [actions.messageAddingSuccess]: () => true,
  [actions.messageAddingFailure]: () => false,
}, true);

const currentChannelId = handleActions({
  [actions.switchCurrentChannelId]: (state, { payload: { newChannelId } }) => newChannelId,
}, 1);

const channelAddingSucceedeed = handleActions({
  [actions.channelAddingSuccess]: () => true,
  [actions.channelAddingFailure]: () => false,
}, true);

export default combineReducers({
  channels: (state = {}) => state,
  messages,
  currentChannelId,
  currentUser: (state = {}) => state,
  messageAddingSucceedeed,
  channelAddingSucceedeed,
  form: formReducer,
});
