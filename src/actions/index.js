import { createAction } from 'redux-actions';
import axios from 'axios';

export const updateMessages = createAction('MESSAGES_UPDATE');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ message, channelId, currentUser }) => (dispatch) => {
  dispatch(addMessageRequest());
  const url = `/api/v1/channels/${channelId}/messages`;
  const data = { type: 'messages', attributes: { message, userName: currentUser } };
  return axios.post(url, { data })
    .then(() => dispatch(addMessageSuccess()))
    .catch((e) => {
      dispatch(addMessageFailure());
      console.error(e);
    });
  // dispatch(addMessageRequest());
  // try {
  //   axios.post(url, { data });
  //   dispatch(addMessageSuccess());
  // } catch (e) {
  //   dispatch(addMessageFailure());
  // }
};

export const switchCurrentChannelId = createAction('CHANNEL_SWITCH');
