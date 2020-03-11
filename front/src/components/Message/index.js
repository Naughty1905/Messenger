import React from 'react';
import AudiosMessage from './AudiosMessage'
import moment from 'moment';
import './MessageBlack.css';

export default function Message(props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
    type,
    speechToText,
    isAvailableSpeechToText,
    date
  } = props;



  const friendlyTimestamp = moment().format('LLLL');
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
            <AudiosMessage isAvailableSpeechToText={isAvailableSpeechToText} speechToText={speechToText} content={data.content} date={date} />
            :
            <>
            <time dateTime={date} className="message-date" >{ date }</time>
                <p className="message-content" >{data.content}</p>
              </>
          }
          {isMine && <i style={{ fontSize: '1.3rem', color: data.isSeen && 'cyan' }} className="ion-ios-done-all icon-read-message" />}
        </div>
      </div>
    </div>
  );
}
