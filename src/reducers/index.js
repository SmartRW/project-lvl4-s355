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

const messageAddingStage = handleActions({
  [actions.addMessageRequest]: () => 'requested',
  [actions.addMessageSuccess]: () => 'successed',
  [actions.addMessageFailure]: () => 'failed',
}, 'none');

export default combineReducers({
  channels: (state = {}) => state,
  messages,
  currentChannelId: (state = {}) => state,
  currentUser: (state = {}) => state,
  messageAddingStage,
  form: formReducer,
});
