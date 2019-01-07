import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

export const updateMessages = createAction('MESSAGES_UPDATE');

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

export const switchCurrentChannelId = createAction('CHANNEL_SWITCH');

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

export const updateChannels = createAction('CHANNELS_UPDATE');
