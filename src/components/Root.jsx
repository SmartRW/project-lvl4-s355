import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import MessageForm from './MessageForm';

const Root = () => (
  <div className="row">
    <Channels />
    <div className="col-md-9 bg-light text-dark p-2">
      <Chat />
      <MessageForm />
    </div>
  </div>
);

export default Root;
