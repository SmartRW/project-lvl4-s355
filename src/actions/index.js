import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

export const updateMessages = createAction('MESSAGES_UPDATE');

export const messageAddingSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const messageAddingFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ message, channelId, currentUser }) => async (dispatch) => {
  const url = routes.getMessagesUrl(channelId);
  const data = { type: 'messages', attributes: { message, userName: currentUser } };
  try {
    await axios.post(url, { data });
    dispatch(messageAddingSuccess());
  } catch (e) {
    dispatch(messageAddingFailure());
    console.error(e);
  }
};

export const switchCurrentChannelId = createAction('CHANNEL_SWITCH');
export const addChannel = createAction('CHANNEL_ADD');
