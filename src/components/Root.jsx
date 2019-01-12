import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import MessageForm from './MessageForm';
import NewChannelModal from './NewChannelModal';

const Root = () => (
  <div className="row">
    <div className="col-md-3 p-0 pb-2 bg-info">
      <Channels />
      <div className="text-center">
        <NewChannelModal />
      </div>
    </div>
    <div className="col-md-9 bg-light text-dark p-2">
      <Chat />
      <MessageForm />
    </div>
  </div>
);

export default Root;
