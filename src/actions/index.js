import { createAction } from 'redux-actions';
import axios from 'axios';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ message, channelId, currentUser }) => async (dispatch) => {
  dispatch(addMessageRequest());
  const url = `/api/v1/channels/${channelId}/messages`;
  const data = { type: 'messages', attributes: { message, userName: currentUser } };
  try {
    await axios.post(url, { data });
    dispatch(addMessageSuccess());
  } catch (e) {
    dispatch(addMessageFailure());
  }
};

export const makeTest = createAction('MAKE_TEST');
