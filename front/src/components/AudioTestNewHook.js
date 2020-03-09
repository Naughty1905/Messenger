import React, { useState, useEffect } from 'react'

const AudioTestNewHook = () => {
  const [video,] = useState(React.createRef());

  const videoError = (error) => {
    console.log("error", error);
  }

  const handleVideo = (stream) => {
    video.current.srcObject = stream;
  }

  useEffect(() => {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, handleVideo, videoError);
    }
  });

  return (
    <div>
      <video ref={video} autoPlay={true} />
    </div>
  )
}

export default AudioTestNewHook
