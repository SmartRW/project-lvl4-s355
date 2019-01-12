import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addingMessage]: (state, { payload: { attributes } }) => [
    ...state,
    attributes,
  ],
  [actions.removalMessages]: (state, { payload: { id } }) => state.filter(m => m.channelId !== id),
}, []);

const messageAddingSucceeded = handleActions({
  [actions.messageAddingSuccess]: () => true,
  [actions.messageAddingFailure]: () => false,
}, true);

const currentChannelId = handleActions({
  [actions.switchCurrentChannelId]: (state, { payload: { newChannelId } }) => newChannelId,
}, 1);

const currentlyEditedChannelId = handleActions({
  [actions.setCurrentlyEditedChannelId]: (state, { payload: { channelId } }) => Number(channelId),
  [actions.resetCurrentlyEditedChannelId]: () => null,
}, null);

const channels = handleActions({
  [actions.addingChannel]: (state, { payload: { attributes } }) => [
    ...state,
    attributes,
  ],
  [actions.renamingChannel]: (state, { payload: { attributes: { id, name } } }) => {
    const newState = state.slice();
    const renamedChannelIndex = newState.findIndex(item => item.id === id);
    newState[renamedChannelIndex].name = name;
    return newState;
  },
  [actions.removalChannel]: (state, { payload: { id } }) => state
    .filter(c => c.id !== id),
}, []);

const channelAddingSucceeded = handleActions({
  [actions.channelAddingSuccess]: () => true,
  [actions.channelAddingFailure]: () => false,
}, true);

const channelRenamingSucceeded = handleActions({
  [actions.channelRenamingSuccess]: () => true,
  [actions.channelRenamingFailure]: () => false,
}, true);

const channelRemovalSucceeded = handleActions({
  [actions.channelRemovalSuccess]: () => true,
  [actions.channelRemovalFailure]: () => false,
}, true);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  currentUser: (state = {}) => state,
  messageAddingSucceeded,
  channelAddingSucceeded,
  channelRenamingSucceeded,
  channelRemovalSucceeded,
  currentlyEditedChannelId,
  form: formReducer,
});
