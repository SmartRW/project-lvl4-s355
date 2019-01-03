import React from 'react';
import io from 'socket.io-client';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId, messages, currentUser }) => ({
  currentChannelId,
  messages,
  currentUser,
});

const getNickname = (authorName, currentName) => (
  authorName === currentName
    ? <span className="font-weight-bold text-success">You: </span>
    : (
      <span className="font-weight-bold text-primary">
        {`${authorName || 'Unknown user'}: `}
      </span>
    )
);

@connect(mapStateToProps)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { updateMessages } = this.props;
    const socket = io();
    socket.on('newMessage', ({ data }) => updateMessages(data));
  }

  render = () => {
    const { currentChannelId, messages, currentUser } = this.props;

    return (
      <ul className="d-flex flex-column-reverse list-group p-2 mb-2 overflow-auto border rounded overflow-auto" style={{ height: 500 }} scrolltop="-10000">
        {messages
          .filter(message => message.channelId === currentChannelId)
          .reverse()
          .map(({ message, id, userName }) => (
            <li key={id} className="list-group-item pt-1 pb-1 pl-2 pl-3 border-0 bg-transparent">
              {getNickname(userName, currentUser)}
              <span>{message}</span>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default Chat;
