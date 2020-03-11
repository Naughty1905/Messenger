import React from 'react'

const AudiosMessage = (props) => {
  const { content, isAvailableSpeechToText, speechToText, date } = props;
  return (
    <div  className="AudioTagContainer">
      <time dateTime={date} className="message-date" >{date}</time>
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
