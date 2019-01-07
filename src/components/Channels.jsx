import React from 'react';
import cn from 'classnames';
import connect from '../utils/connect';

const mapStateToProps = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

@connect(mapStateToProps)
class Channels extends React.Component {
  onClick = id => () => {
    const { switchCurrentChannelId } = this.props;
    switchCurrentChannelId({ newChannelId: id });
  }

  render = () => {
    const { channels, currentChannelId } = this.props;
    const channelClasses = {
      'list-group-item': true,
      'list-group-item-action': true,
      'rounded-0': true,
      'text-white': true,
      'pt-1': true,
      'pb-1': true,
      'pr-3': true,
      'pl-3': true,
      'border-0': true,
      'bg-info': true,
    };

    return (
      <div className="list-group mb-3">
        <div className={cn(channelClasses)}>
          channels
        </div>
        {channels.map(channel => (
          <button
            key={channel.id}
            className={cn({
              ...channelClasses,
              'font-weight-bold': channel.id === currentChannelId,
              disabled: channel.id === currentChannelId,
            })}
            type="button"
            onClick={this.onClick(channel.id)}
          >
            {`# ${channel.name}`}
          </button>
        ))}
      </div>
    );
  }
}

export default Channels;
