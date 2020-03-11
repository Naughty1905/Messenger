import React from 'react';
import moment from 'moment';
import Message from '../Message';

const renderMessages = (messages, user) => {
  let i = 0;
  let messageCount = messages.length;
  let tempMessages = [];

  while (i < messageCount) {
    let previous = messages[i - 1];
    let current = messages[i];
    let currentType = current.messageType;
    let speechToText = current.speechToText;
    let next = messages[i + 1];
    let isMine = current.owner === user;
    let isAvailableSpeechToText = current.isAvailableSpeechToText;
    let currentMoment = moment(current.timestamp);
    let prevBySameAuthor = false;
    let nextBySameAuthor = false;
    let startsSequence = true;
    let endsSequence = true;
    let showTimestamp = true;

    if (previous) {
      let previousMoment = moment(previous.timestamp);
      let previousDuration = moment.duration(currentMoment.diff(previousMoment));
      prevBySameAuthor = previous.author === current.author;

      if (prevBySameAuthor && previousDuration.as('hours') < 1) {
        startsSequence = false;
      }

      if (previousDuration.as('hours') < 1) {
        showTimestamp = false;
      }
    }

    if (next) {
      let nextMoment = moment(next.timestamp);
      let nextDuration = moment.duration(nextMoment.diff(currentMoment));
      nextBySameAuthor = next.author === current.author;

      if (nextBySameAuthor && nextDuration.as('hours') < 1) {
        endsSequence = false;
      }
    }

    tempMessages.push(
      <Message
        key={performance.now()}
        isMine={isMine}
        startsSequence={startsSequence}
        endsSequence={endsSequence}
        showTimestamp={showTimestamp}
        data={current}
        type={currentType}
        speechToText={speechToText}
        isAvailableSpeechToText={isAvailableSpeechToText}
      />
    );

    // Proceed to the next message.
    i += 1;
  }

  return tempMessages;
}


export default renderMessages;
