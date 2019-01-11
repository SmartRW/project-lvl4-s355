const host = '/api/v1';

export default {
  getMessagesUrl: channelId => [host, 'channels', channelId, 'messages'].join('/'),
  getChannelsUrl: () => [host, 'channels'].join('/'),
  getChannelUrl: id => [host, 'channels', id].join('/'),
};
