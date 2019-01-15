import React from 'react';
import connect from '../utils/connect';

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
  render = () => {
    const {
      currentChannelId,
      messages,
      currentUser,
    } = this.props;

    return (
      <ul className="d-flex flex-column-reverse list-group p-2 mb-2 overflow-auto border rounded overflow-auto" style={{ height: 500 }}>
        {Object.values(messages)
          .filter(({ channelId }) => channelId === currentChannelId)
          .reverse()
          .map(({ id, userName, message }) => (
            <li key={id} className="list-group-item pt-1 pb-1 pl-2 pl-3 border-0 bg-transparent">
              {getNickname(userName, currentUser)}
              <span>{message}</span>
            </li>
          ))}
      </ul>
    );
  }
}

export default Chat;
