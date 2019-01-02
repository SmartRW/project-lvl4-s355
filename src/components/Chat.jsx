import React from 'react';
import io from 'socket.io-client';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId, messages, currentUser }) => ({
  currentChannelId,
  messages,
  currentUser,
});

@connect(mapStateToProps)
class Chat extends React.Component {
  render = () => {
    const { currentChannelId, messages, currentUser } = this.props;
    const getNickname = (authorName, currentName) => (
      authorName === currentName
        ? <span className="font-weight-bold text-success">You: </span>
        : (
          <span className="font-weight-bold text-primary">
            {`${authorName || 'Unknown user'}: `}
          </span>
        )
    );
    return (
      <div className="list-group p-2 mb-2 overflow-auto border rounded overflow-auto" style={{ height: 500 }}>
        {messages
          .filter(message => message.channelId === currentChannelId)
          .map(({ message, id, userName }) => (
            <div key={id} className="list-group-item pt-1 pb-1 pl-2 pl-3 border-0">
              {getNickname(userName, currentUser)}
              <span>{message}</span>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Chat;
