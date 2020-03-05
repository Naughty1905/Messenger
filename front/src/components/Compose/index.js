import React, { useState } from 'react';
import './ComposeBlack.css';

// Redux
import { connect } from 'react-redux';
import { getMessge } from '../../redux/actions/actions';

const Compose = (props) => {
  const [messege, setMessege] = useState('');

  const messegeHandler = (event) => {
    event.preventDefault();
    props.getMessge(messege);
    setMessege('');
  }

  return (
    <div className="compose">
      <input
        autoFocus
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        value={messege}
        onChange={(event) => setMessege(event.target.value)}
        onKeyPress={(event) => { event.key === 'Enter' && messegeHandler(event) }}
      />

      {
        props.rightItems
      }
    </div>
  );
}




export default connect(
  null,
  { getMessge }
)(Compose)
