import React from 'react';
import moment from 'moment';
import './MessageBlack.css';

export default function Message(props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
    type
  } = props;


  const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  debugger
  return (
    <div className={[
      'message',
      `${isMine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
      `${endsSequence ? 'end' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
        <div className="timestamp">
          {friendlyTimestamp}
        </div>
      }

      <div className="bubble-container">
        <div className="bubble my-message" title={friendlyTimestamp}>
          {
            type === 'Audio' ?
              <audio controls="controls" src={data.content} /> :
              <p style={{ margin: '0' }}>{data.content}</p>
          }
          {isMine && <i style={{ fontSize: '1.3rem', marginLeft: '0.8rem', color: data.isSeen && 'cyan' }} className="ion-ios-done-all" />}
        </div>
      </div>
    </div>
  );
}
