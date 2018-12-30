import React from 'react';
import connect from '../connect';

const mapStateToProps = ({ channels }) => ({ channels });

@connect(mapStateToProps)
class Channels extends React.Component {
  render = () => {
    const { channels } = this.props;
    return (
      <div className="list-group col-md-3 p-0">
        <div className="list-group-item list-group-item-action rounded-0 b-0 bg-info text-white pt-1 pb-1 pl-2 pl-3 border-0">
          Channels
        </div>
        {channels.map(c => (
          <button key={c.id} className="list-group-item list-group-item-action rounded-0 b-0 bg-info text-white pt-1 pb-1 pl-2 pl-3 border-0" type="button">
            {`# ${c.name}`}
          </button>
        ))}
      </div>
    );
  }
}

export default Channels;
