import React from 'react';
import { connect } from 'react-redux';
import { getMessage } from '../../redux/actions/actions';
import { storage } from '../../Firebase';

// Seech recorder
import { speechRecorderStart, speechRecorderStop, speechRecorderOnResult, speechRecorderAnavailable } from './SpeechRecognitionFunc'

const audioType = 'audio/webm; codecs=opus';


class SpeechRecognition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
      speechText: false,
      url: '',
      navigator: navigator.userAgent.indexOf('Chrome') >= 0,
    };
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    this.mediaRecorder = new MediaRecorder(stream, {
      type: 'audio',
      mimeType: audioType
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


    // start recording speech and convert it to text
    if (!!this.state.navigator) {
      this.recognition = new window.webkitSpeechRecognition();
    }

    // This function only available for Chrome and FireFox browsers
    // And here we check whether we can use it
    this.state.navigator && speechRecorderStart(this.recognition);

    // set recording voice message
    this.setState({ recording: true });
  }

  async componentWillUnmount() {
    this.mediaRecorder.stream.getTracks().forEach(function (track) {
      track.stop();
    });


    const blob = new Blob(this.chunks, { type: audioType });

    const audioUrl = window.URL.createObjectURL(blob);
    if (this.state.navigator) {
      speechRecorderOnResult({
        recognizer: this.recognition,
        storage,
        audioUrl,
        blob,
        getMessage: this.props.getMessage,
        user: this.props.user,
        isAvailableSpeechToText: this.state.navigator
      })
    } else {
      speechRecorderAnavailable({
        storage,
        audioUrl,
        blob,
        getMessage: this.props.getMessage,
        user: this.props.user,
        isAvailableSpeechToText: this.state.navigator
      })
    }

    this.state.navigator && speechRecorderStop(this.recognition)

    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false });

  }

  render() {
    return (
      <>
      </>
    );
  }
}

const mapStateToProps = state => ({
  recording: state.recording,
  user: state.user,
  speechToText: state.speechToText
})

export default connect(
  mapStateToProps,
  {
    getMessage,
  }
)(SpeechRecognition);
