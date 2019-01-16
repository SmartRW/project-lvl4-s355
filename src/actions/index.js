import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

export const switchCurrentChannelId = createAction('CHANNEL_SWITCH');

export const setCurrentlyEditedChannelId = createAction('CURRENTLY_EDITED_CHANNEL_ID_SET');

export const resetCurrentlyEditedChannelId = createAction('CURRENTLY_EDITED_CHANNEL_ID_RESET');

export const removalMessages = createAction('MESSAGES_REMOVE');

export const addingMessage = createAction('MESSAGE_ADD');
export const messageAddingSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const messageAddingFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({
  message,
  channelId,
  currentUser,
  reset,
}) => async (dispatch) => {
  if (message && message.trim() !== '') {
    const url = routes.getMessagesUrl(channelId);
    const data = { type: 'messages', attributes: { message: message.trim(), userName: currentUser } };
    try {
      await axios.post(url, { data });
      reset();
      dispatch(messageAddingSuccess());
    } catch (e) {
      dispatch(messageAddingFailure());
      console.error(e);
    }
  }
};

export const addingChannel = createAction('CHANNEL_ADD');
export const renamingChannel = createAction('CHANNEL_RENAME');
export const removalChannel = createAction('CHANNEL_REMOVE');

export const editChannelRequest = createAction('CHANNEL_EDIT_REQUEST');
export const editChannelSuccess = createAction('CHANNEL_EDIT_SUCCESS');
export const editChannelFailure = createAction('CHANNEL_EDIT_FAILURE');

const editingChannelActions = {
  addChannel: {
    getPayload: ({ newChannelName }) => [
      routes.getChannelsUrl(),
      { data: { attributes: { name: newChannelName.trim() } } },
    ],
    action: axios.post,
  },
  renameChannel: {
    getPayload: ({ channelNewName, channelId }) => [
      routes.getChannelUrl(channelId),
      { data: { attributes: { name: channelNewName.trim() } } },
    ],
    action: axios.patch,
  },
  removeChannel: {
    getPayload: ({ channelId }) => [routes.getChannelUrl(channelId)],
    action: axios.delete,
    postAction: switchCurrentChannelId({ newChannelId: 1 }),
  },
};

export const editChannel = ({ type, data, closeModal }) => async (dispatch) => {
  const { getPayload, action, postAction } = editingChannelActions[type];
  try {
    dispatch(editChannelRequest());
    await action(...getPayload(data));
    dispatch(editChannelSuccess());
    closeModal();
    if (postAction) {
      dispatch(postAction);
    }
  } catch (e) {
    dispatch(editChannelFailure());
    console.error(e);
  }
};
