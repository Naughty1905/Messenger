import React from 'react';
import { connect } from 'react-redux';
import { getMessage } from '../redux/actions/actions';
import { storage } from '../Firebase';
import Recorder from 'recorder-js';

const audioType = 'audio/webm; codecs=opus';


class AudioTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
      speechText: false,
      url: '',
    };
  }

  async sendAudio(blob) {
    let fd = new FormData();
    console.log(blob);
    fd.append('audioMessage', blob, 'audioMessage.webm');
    console.log(fd);

    await fetch('http://localhost:5000/chats/audio-message', {
      method: 'POST',
      body: fd
    })
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

    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'ru-RU, en-US';
    this.recognition.start(10);
    this.recognition.onresult = async (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.setState({ speechToTextMessages: event.results[i][0].transcript })
        }
      }
    }


    // say that we're recording
    this.setState({ recording: true });
  }

  async componentWillUnmount() {
    this.mediaRecorder.stream.getTracks().forEach(function (track) {
      track.stop();
    });

    setTimeout(() => {
      this.recognition.stop();
    }, 500)

    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false });
    // save the video to memory 
    const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
    console.log(blob)
    this.sendAudio(blob)
    // generate video url from blob
    const audioUrl = window.URL.createObjectURL(blob);




    console.log(this.state.speechToTextMessages, '<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>')
    // append audioUrl to list of saved audios for rendering
    const uploadTask = storage.ref(`audios/${audioUrl}`).put(blob);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // this.setState({ progress });
      },
      (error) => {
        // error function ....
      },
      () => {
        // complete function ....
        storage.ref('audios').child(audioUrl).getDownloadURL().then(url => {
          this.props.getMessage({ message: url, user: this.props.user, messageType: 'Audio' });
        })
      });
  }

  render() {
    return (
      <div className="camera" >
      </div>
    );
  }
}


const mapStateToProps = state => ({
  recording: state.recording,
  user: state.user
})

export default connect(
  mapStateToProps,
  { getMessage }
)(AudioTest);




// Router

// router.post('/audio-message', (req, res) => {
//   const { audioMessage: {
//     data: buffer
//   } } = req.files

//   googleApiSpeechToText(buffer)
//   .catch(console.error)
// });



