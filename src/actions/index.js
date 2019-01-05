import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

export const updateMessages = createAction('MESSAGES_UPDATE');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ message, channelId, currentUser }) => (dispatch) => {
  dispatch(addMessageRequest());
  const url = routes.getMessagesUrl(channelId);
  const data = { type: 'messages', attributes: { message, userName: currentUser } };
  return axios.post(url, { data })
    .then(() => dispatch(addMessageSuccess()))
    .catch((e) => {
      dispatch(addMessageFailure());
      console.error(e);
    });
};

export const switchCurrentChannelId = createAction('CHANNEL_SWITCH');
export const addChannel = createAction('CHANNEL_ADD');
