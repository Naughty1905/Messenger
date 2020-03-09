import React from 'react';
import { connect } from 'react-redux'
const videoType = 'audio/webm';


class AudioTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
    };
  }


  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    this.mediaRecorder = new MediaRecorder(stream, {
      type: 'audio',
      mimeType: videoType
    });
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });
  }

  async componentWillUnmount() {
    this.mediaRecorder.stream.getTracks().forEach(function (track) {
      track.stop();
    });
    this.mediaRecorder.stop()
    // say that we're not recording
    this.setState({ recording: false });
    // save the video to memory
    const blob = new Blob(this.chunks, { type: videoType });
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const videos = this.state.videos.concat([videoURL]);
    this.setState({ videos });
    console.log(videoURL)
  }

  // deleteVideo(videoURL) {
  //   // filter out current videoURL from the list of saved videos
  //   const videos = this.state.videos.filter(v => v !== videoURL);
  //   this.setState({ videos });
  // }
  // playTrack(track) {
  //   const stream = new MediaStream()
  //   stream.addTrack(track)
  //   this.audio.srcObject = stream;
  // }
  render() {
    const { recording, videos } = this.state;

    return (
      <div className="camera">
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recording: state.recording
})

export default connect(mapStateToProps)(AudioTest);
