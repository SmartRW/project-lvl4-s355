import React from 'react';
import connect from '../connect';
import Channels from './Channels';
import Chat from './Chat';

const mapStateToProps = state => state;

@connect(mapStateToProps)
class Root extends React.Component {
  render = () => (
    <div className="row min-vh-50">
      <Channels />
      <div className="col-md-9 bg-light text-dark">
        <Chat />
      </div>
    </div>
  )
}

export default Root;
