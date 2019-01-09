import React from 'react';
import cn from 'classnames';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import Button from 'react-bootstrap/lib/Button';
import connect from '../utils/connect';
import RenameChannelModal from './RenameChannelModal';

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
      'mb-1': true,
      'rounded-0': true,
      'text-left': true,
      'overflow-hidden': true,
      'text-nowrap': true,
    };

    return (
      <div className="mb-3 p-2 d-flex flex-column">
        {channels.map(channel => (
          channel.removable
            ? (
              <Dropdown key={channel.id} className="d-flex">
                <Button
                  variant="info"
                  onClick={this.onClick(channel.id)}
                  className={cn({
                    ...channelClasses,
                    'flex-grow-1': true,
                    'font-weight-bolder': currentChannelId === channel.id,
                  })}
                >
                  {`# ${channel.name}`}
                </Button>

                <Dropdown.Toggle split variant="info" className="mb-1 rounded-0 ml-1" id="dropdown-split-basic" />

                <Dropdown.Menu>
                  <Dropdown.Item as={RenameChannelModal}>
                    rename
                  </Dropdown.Item>
                  <Dropdown.Item as={RenameChannelModal}>
                    remove
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
            : (
              <Button
                variant="info"
                key={channel.id}
                onClick={this.onClick(channel.id)}
                className={cn({
                  ...channelClasses,
                  'font-weight-bolder': currentChannelId === channel.id,
                })}
              >
                {`# ${channel.name}`}
              </Button>
            )
        ))}
      </div>
    );
  }
}

export default Channels;
