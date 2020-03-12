import React from 'react';
import moment from 'moment'


const AudiosMessage = (props) => {
  const { content, isAvailableSpeechToText, speechToText, date } = props;
  const friendlyTimestampMessage = moment(date).format('LT');
  return (
    <div  className="AudioTagContainer">
      <time dateTime={date} className="message-date" >{friendlyTimestampMessage}</time>
      <audio controls="controls" src={content} />
      {
        isAvailableSpeechToText ?
          <small className="speechFromText-message">{speechToText}</small> :
          <small className="speechFromText-message">This function only available in Chrome browser</small>
      }
    </div>
  )
}

export default AudiosMessage
