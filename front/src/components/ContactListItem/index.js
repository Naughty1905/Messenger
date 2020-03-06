import React, { useEffect } from 'react';
import shave from 'shave';

import './ContactListItem.css';

export default function ContactListItem(props) {

  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const { photo, name } = props.data;

  return (
    <div className="contact-list-item">
      <img className="contact-photo" src={photo} alt="contact" />
      <div className="contact-info">
        <h1 className="contact-title">{name}</h1>
      </div>
    </div>
  );
}
