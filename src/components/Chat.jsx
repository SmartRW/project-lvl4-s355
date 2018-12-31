import React from 'react';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId, messages, users }) => ({
  currentChannelId,
  messages,
  users,
});

@connect(mapStateToProps)
class Chat extends React.Component {
  render = () => {
    const { currentChannelId, messages, users } = this.props;

    return (
      <div className="list-group p-2 mb-2 overflow-auto border rounded" style={{ minHeight: 500 }}>
        {messages
          .filter(message => message.channelId === currentChannelId)
          .map(message => (
            <div key={message.id} className="list-group-item pt-1 pb-1 pl-2 pl-3 border-0">
              <div className="font-weight-bold">
                {users.find(user => user.id === message.userId).name}
              </div>
              <div>{message.text}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Chat;
