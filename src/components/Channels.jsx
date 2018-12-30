import React from 'react';
import connect from '../connect';

const mapStateToProps = ({ channels }) => ({ channels });

@connect(mapStateToProps)
class Channels extends React.Component {
  render = () => {
    const { channels } = this.props;
    return (
      <div className="list-group col-md-3">
        {channels.map(c => (
          <button key={c.id} className="list-group-item list-group-item-action" type="button">
            {c.name}
          </button>
        ))}
      </div>
    );
  }
}

export default Channels;
