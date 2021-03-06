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
    user: null,
    messageType: 'String',
    speechToText: false,
    isAvailableSpeechToText: false,
    isSeen: false,
    date: Date.now()
  },
  messages: {},
  chat: '',
  chats: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        message: Object.assign({}, state.message, {
          ...action.payload
        })
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case START_CHAT_RECIEVE: {
      return {
        ...state,
        chat: action.payload
      }
    }
    case GET_CONVERSATIONS_RECIEVE: {
      return {
        ...state,
        chats: Object.assign({}, state.chats, { ...action.payload })
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
