import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import { omit } from 'lodash';
import * as actions from '../actions';

const DEFAULT_CHANNEL_ID = 1;

const messages = handleActions({
  [actions.addingMessage]: (state, {
    payload: {
      attributes: {
        id,
        channelId,
        userName,
        message,
      },
    },
  }) => ({
    byId: { ...state.byId, [id]: { channelId, userName, message } },
    allIds: [...state.allIds, id],
  }),
  [actions.removalMessages]: (state, {
    payload: { id },
  }) => ({
    byId: omit(state.byId, id),
    allIds: state.allIds.filter(messageId => state.byId[messageId].channelId !== id),
  }),
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
  [actions.addingChannel]: (state, {
    payload: {
      attributes: {
        id,
        name,
        removable,
      },
    },
  }) => ({
    byId: { ...state.byId, [id]: { name, removable } },
    allIds: [...state.allIds, id],
  }),
  [actions.renamingChannel]: (state, {
    payload: {
      attributes: {
        id,
        name,
      },
    },
  }) => ({
    ...state,
    byId: { ...state.byId, [id]: { ...state.byId[id], name } },
  }),
  [actions.removalChannel]: (state, { payload: { id } }) => ({
    byId: omit(state.byId, id),
    allIds: state.allIds.filter(channelId => channelId !== id),
  }),
}, {});

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
