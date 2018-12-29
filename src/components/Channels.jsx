import React from 'react';

const Channels = ({ channels }) => (
  <ul className="list-group">
    {channels.map(c => (
      <li key={c.id} className="list-group-item">
        {c.name}
      </li>
    ))}
  </ul>
);

export default Channels;
