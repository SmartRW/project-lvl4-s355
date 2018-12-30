import React from 'react';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

@connect(mapStateToProps)
class Channels extends React.Component {
  render = () => {
    const { channels, currentChannelId } = this.props;
    const channelClasses = {
      'list-group-item': true,
      'list-group-item-action': true,
      'rounded-0': true,
      'b-0': true,
      'bg-info': true,
      'text-white': true,
      'pt-1': true,
      'pb-1': true,
      'pl-2': true,
      'pl-3': true,
      'border-0': true,
    };

    const currentChannelClasses = {
      ...channelClasses,
      disabled: true,
      'font-weight-bold': true,
    };

    return (
      <div className="list-group col-md-3 p-0">
        <div className="list-group-item list-group-item-action rounded-0 bg-info text-white pt-1 pb-1 pl-2 pl-3 border-0">
          Channels
        </div>
        {channels.map(c => (
          <button
            key={c.id}
            className={cn(c.id === currentChannelId
              ? currentChannelClasses
              : channelClasses)}
            type="button"
          >
            {`# ${c.name}`}
          </button>
        ))}
      </div>
    );
  }
}

export default Channels;
