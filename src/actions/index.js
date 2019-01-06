import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

export const updateMessages = createAction('MESSAGES_UPDATE');

export const messageAddingSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const messageAddingFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ message, channelId, currentUser }) => async (dispatch) => {
  if (message && message.trim() !== '') {
    const url = routes.getMessagesUrl(channelId);
    const data = { type: 'messages', attributes: { message: message.trim(), userName: currentUser } };
    try {
      await axios.post(url, { data });
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

export const addChannel = ({ newChannelName, channels }) => async (dispatch) => {
  const existingChannelNames = channels.map(channel => channel.name);
  if (newChannelName && newChannelName.trim() !== '' && !existingChannelNames.includes(newChannelName.trim())) {
    const url = routes.getChannelsUrl();
    const data = { attributes: { name: newChannelName } };
    try {
      console.dir({ data });
      await axios.post(url, { data });
      dispatch(channelAddingSuccess());
    } catch (e) {
      dispatch(channelAddingFailure());
      console.error(e);
    }
  } else {
    dispatch(channelAddingFailure());
  }
};

export const updateChannels = createAction('CHANNELS_UPDATE');
