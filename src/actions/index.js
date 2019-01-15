import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

const DEFAULT_CHANNEL_ID = 1;

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
export const channelAddingSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const channelAddingFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = ({ newChannelName, closeModal }) => async (dispatch) => {
  const url = routes.getChannelsUrl();
  const data = { attributes: { name: newChannelName.trim() } };
  try {
    await axios.post(url, { data });
    closeModal();
    dispatch(channelAddingSuccess());
  } catch (e) {
    dispatch(channelAddingFailure());
    console.error(e);
  }
};

export const renamingChannel = createAction('CHANNEL_RENAME');
export const channelRenamingSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const channelRenamingFailure = createAction('CHANNEL_RENAME_FAILURE');

export const renameChannel = ({ channelNewName, channelId, closeModal }) => async (dispatch) => {
  const url = routes.getChannelUrl(channelId);
  const data = { attributes: { name: channelNewName.trim() } };
  try {
    await axios.patch(url, { data });
    closeModal();
    dispatch(channelRenamingSuccess());
  } catch (e) {
    dispatch(channelRenamingFailure());
    console.error(e);
  }
};

export const removalChannel = createAction('CHANNEL_REMOVE');
export const channelRemovalSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const channelRemovalFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const removeChannel = ({ channelId, closeModal }) => async (dispatch) => {
  const url = routes.getChannelUrl(channelId);
  try {
    await axios.delete(url);
    dispatch(switchCurrentChannelId({ newChannelId: DEFAULT_CHANNEL_ID }));
    closeModal();
    dispatch(channelRemovalSuccess);
  } catch (e) {
    dispatch(channelRemovalFailure);
    console.error(e);
  }
};
