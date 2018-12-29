import React from 'react';

const Channels = ({ channels }) => (
  <div className="list-group col-md-3">
    {channels.map(c => (
      <button key={c.id} className="list-group-item list-group-item-action">
        {c.name}
      </button>
    ))}
  </div>
);

export default Channels;
