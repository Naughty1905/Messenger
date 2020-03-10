const speech = require('@google-cloud/speech');
const fs = require('fs');

async function googleApiSpeechToText(buffer) {
  const client = new speech.SpeechClient();
  
  const audioBytes = buffer.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'ru-RU',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
    console.log(response);
    
  console.log(`Transcription: ${transcription}`)
}


module.exports = googleApiSpeechToText;
