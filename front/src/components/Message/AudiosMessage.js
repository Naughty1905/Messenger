import React from 'react'

const AudiosMessage = (props) => {
  const { content, isAvailableSpeechToText, speechToText } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', }} className="AudioTagContainer">
      <audio controls="controls" src={content} />
      {
        isAvailableSpeechToText ?
          <small>{speechToText}</small> :
          <small>This function only available in Chrome browser</small>
      }
    </div>
  )
}

export default AudiosMessage
