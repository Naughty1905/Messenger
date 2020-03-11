
export const speechRecorderStart = (recognizer) => {
  recognizer.continuous = true;
  recognizer.lang = 'ru-RU, en-US';
  recognizer.start(10);
}

export const speechRecorderStop = (recognizer) => {
  setTimeout(() => {
    recognizer.stop();
  }, 500)
}


export const speechRecorderOnResult = ({ recognizer, storage, audioUrl, blob, getMessage, user, isAvailableSpeechToText }) => {
  let speechToText;
  recognizer.onresult = async (event) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        speechToText = await event.results[i][0].transcript;
      }
    }
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
        debugger
        storage.ref('audios').child(audioUrl).getDownloadURL().then(url => {
          debugger
          getMessage({ content: url, user, messageType: 'Audio', speechToText, isAvailableSpeechToText });
        })
      });
  }
}


export const speechRecorderAnavailable = ({ storage, audioUrl, blob, getMessage, user, isAvailableSpeechToText }) => {
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
        getMessage({ message: url, user, messageType: 'Audio', isAvailableSpeechToText });
      })
    });
}

