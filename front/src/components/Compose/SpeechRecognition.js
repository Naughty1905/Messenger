const speechRecognition = (textMessages) => {
  let recognizing;
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'ru-RU, en-US';
  reset(recognizing);
  recognition.onend = reset(recognizing);

  recognition.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        textMessages.value += event.results[i][0].transcript;
      }
    }
  }

}

function reset(recognizing) {
  recognizing = false;
  
}

function toggleStartStop(recognizing, recognition, textMessages) {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
  }
}

export default speechRecognition;
