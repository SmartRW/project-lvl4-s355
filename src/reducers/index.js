import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import { omit } from 'lodash';
import * as actions from '../actions';

const DEFAULT_CHANNEL_ID = 1;

const users = handleActions({
  [actions.addUser]: (state, { payload: { id, userName } }) => ({
    ...state,
    [id]: { id, userName },
  }),
  [actions.deleteUser]: (state, { payload: { id } }) => omit(state, id),
}, {});

const messages = handleActions({
  [actions.addingMessage]: (state, { payload: { attributes } }) => {
    const { id } = attributes;
    return { ...state, [id]: attributes };
  },
  [actions.removalMessages]: (state, { payload: { id } }) => omit(state, id),
}, {});

const messageAddingSucceeded = handleActions({
  [actions.messageAddingSuccess]: () => true,
  [actions.messageAddingFailure]: () => false,
}, true);

const currentChannelId = handleActions({
  [actions.switchCurrentChannelId]: (state, { payload: { newChannelId } }) => newChannelId,
}, DEFAULT_CHANNEL_ID);

const currentlyEditedChannelId = handleActions({
  [actions.setCurrentlyEditedChannelId]: (state, { payload: { channelId } }) => channelId,
  [actions.resetCurrentlyEditedChannelId]: () => null,
}, null);

const channels = handleActions({
  [actions.addingChannel]: (state, { payload: { attributes } }) => {
    const { id } = attributes;
    return { ...state, [id]: attributes };
  },
  [actions.renamingChannel]: (state, { payload: { attributes } }) => {
    const { id, name } = attributes;
    return { ...state, [id]: { ...state[id], name } };
  },
  [actions.removalChannel]: (state, { payload: { id } }) => omit(state, id),
}, {});

const channelEditingState = handleActions({
  [actions.editChannelRequest]: () => 'requesting',
  [actions.editChannelSuccess]: () => 'success',
  [actions.editChannelFailure]: () => 'failure',
}, 'none');

export default combineReducers({
  channels,
  messages,
  users,
  currentChannelId,
  currentUser: (state = {}) => state,
  messageAddingSucceeded,
  channelEditingState,
  currentlyEditedChannelId,
  form: formReducer,
});
