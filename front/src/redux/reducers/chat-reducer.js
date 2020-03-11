import {
  GET_MESSAGE,
  SET_MESSAGES,
  START_CHAT_RECIEVE,
  GET_CONVERSATIONS_RECIEVE,
  SET_RECORDING,
} from '../actions/action-types';

const initialState = {
  message: {
    content: null,
    owner: null,
    messageType: 'String',
    speechToText: null,
    isAvailableSpeechToText: false
  },
  messages: [],
  chat: '',
  chats: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      const { message, user, messageType, speechToText, isAvailableSpeechToText } = action.payload;
      return {
        ...state,
        message: {
          content: message,
          owner: user,
          messageType,
          speechToText,
          isAvailableSpeechToText
        }
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case START_CHAT_RECIEVE: {
      return {
        ...state,
        messages: action.payload.messages,
        chat: action.payload.chat
      }
    }
    case GET_CONVERSATIONS_RECIEVE: {
      return {
        ...state,
        chats: action.payload
      }
    }
    case SET_RECORDING: {
      return {
        ...state,
        recording: !state.recording
      }
    }
    default:
      return state;
  }
}

export default chatReducer;
