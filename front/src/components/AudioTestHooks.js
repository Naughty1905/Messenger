import React, { useState, useEffect, useRef } from 'react'

const AudioTestHooks = (props) => {
  const v = useRef();
  const videoType = 'video/webm'
  const [recording, setRecording] = useState(false);
  const [videos, setVideos] = useState([]);
  const [chunk, setChunk] = useState([]);
  // const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // const startStream = async () => {
  //   const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //   setStream(newStream)
  //   const recorder = new MediaRecorder(newStream, {
  //     mimeType: videoType,
  //   });
  //   setMediaRecorder(recorder)
  // }

  // const setMediaRec = async (stream) => {
  //   setMediaRecorder(new MediaRecorder(stream, {
  //     mimeType: videoType,
  //   }))
  // }  

  const startRecording = (e) => {
    e.preventDefault();
    // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    setMediaRecorder(async () => {
      return (new MediaRecorder(await navigator.mediaDevices.getUserMedia({ video: true, audio: true }), {
        mimeType: videoType,
      }))
    })
    console.log(mediaRecorder);
    // wipe old data chunks
    setChunk([]);
    // start recorder with 10ms buffer
    mediaRecorder.start(10);
    // say that we're recording
    setRecording(true)

  }

  const stopRecording = (e) => {
    e.preventDefault();
    // stop the recorder
    mediaRecorder.stop();
    // say that we're not recording
    setRecording(false)
    // save the video to memory
    saveVideo();
  }


  const saveVideo = () => {
    // convert saved chunks to blob
    const blob = new Blob(chunk, { type: videoType });
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    setVideos(...videos.concat([videoURL]))
  }

  const deleteVideo = (videoURL) => {
    // filter out current videoURL from the list of saved videos
    this.setState({ videos });
    setVideos(videos.filter(v => v !== videoURL))
  }

  useEffect(() => {
  }, [])

  return (
    <div className="audio">
      {/* <audio style={{ width: 400 }}
        ref={v => {
          video = v;
        }} /> */}
      <div>
        {!recording && <button onClick={e => startRecording(e)}>Record</button>}
        {recording && <button onClick={e => stopRecording(e)}>Stop</button>}
      </div>
      <div>
        <h3>Recorded videos:</h3>
        {videos.map((videoURL, i) => (
          <div key={`video_${i}`}>
            <video style={{ width: 200 }} src={videoURL} autoPlay loop />
            <div>
              <button onClick={() => deleteVideo(videoURL)}>Delete</button>
              <a href={videoURL}>Download</a>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}


export default AudioTestHooks
