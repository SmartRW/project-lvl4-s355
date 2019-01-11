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

const messageAddingSucceeded = handleActions({
  [actions.messageAddingSuccess]: () => true,
  [actions.messageAddingFailure]: () => false,
}, true);

const currentChannelId = handleActions({
  [actions.switchCurrentChannelId]: (state, { payload: { newChannelId } }) => newChannelId,
}, 1);

const channelAddingSucceeded = handleActions({
  [actions.channelAddingSuccess]: () => true,
  [actions.channelAddingFailure]: () => false,
}, true);

const channels = handleActions({
  [actions.updateChannels]: (state, { payload: { attributes } }) => [
    ...state,
    attributes,
  ],
  [actions.updateChannel]: (state, { payload: { attributes: { id, name } } }) => {
    const newState = state.slice();
    const renamedChannelIndex = newState.findIndex(item => item.id === id);
    newState[renamedChannelIndex].name = name;
    return newState;
  },
}, []);

const channelRenamingSucceeded = handleActions({
  [actions.channelRenamingSuccess]: () => true,
  [actions.channelRenamingFailure]: () => false,
}, true);

const currentlyEditedChannelId = handleActions({
  [actions.setCurrentlyEditedChannelId]: (state, { payload: { channelId } }) => Number(channelId),
  [actions.resetCurrentlyEditedChannelId]: () => null,
}, null);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  currentUser: (state = {}) => state,
  messageAddingSucceeded,
  channelAddingSucceeded,
  channelRenamingSucceeded,
  currentlyEditedChannelId,
  form: formReducer,
});
