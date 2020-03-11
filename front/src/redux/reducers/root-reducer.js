import {
  GET_MESSAGE,
  SET_MESSAGES,
  SET_SIDEBAR,
  SET_NAVLOADER,
  SET_CONTACTS,
  SET_CONVERSATIONS,
  SET_MODAL_ADD_CONTACT,
  REG_NEW_USER_RECIEVE,
  AUTH_ERROR,
  ADD_NEW_CONTACT_RECIEVE,
  GET_CONTACTS_RECIEVE,
  START_CHAT_RECIEVE,
  GET_CONVERSATIONS_RECIEVE,
  SET_RECORDING,
  GET_AUDIOS,
  GET_DATA_FROM_USER_INPUTS,
} from '../actions/action-types';
import objectAssign from 'object-assign';

const initialState = {
  signUpInfo: {
    name: '',
    login: '',
    email: '',
    password: '',
    avatar: ''
  },

  user: localStorage.getItem('user') || '',

  isNav: false,
  navLoader: false,

  message: {
    content: null,
    owner: null,
    messageType: 'String',
    speechToText: null,
    isAvailableSpeechToText: false
  },

  messages: [],
  recording: false,
  audios: [],

  isContact: false,
  isConversation: true,
  isModalAddContact: false,

  isAuth: localStorage.getItem('token') || false,
  isAuthError: false,
  authErrorText: '',

  friends: [],

  chat: '',
  chats: [],

};


function rootReducer(state = initialState, action) {
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
    case SET_CONVERSATIONS:
      return {
        ...state,
        isContact: false,
        isConversation: true
      }
    case SET_SIDEBAR:
      return {
        ...state,
        isNav: !state.isNav,
        isConversation: !state.isConversation
      }
    case SET_CONTACTS:
      return {
        ...state,
        isContact: true,
        isNav: false,
        isConversation: false
      }
    case SET_NAVLOADER:
      return {
        ...state,
        navLoader: !state.navLoader
      }
    case SET_MODAL_ADD_CONTACT:
      return {
        ...state,
        isModalAddContact: !state.isModalAddContact
      }
    case REG_NEW_USER_RECIEVE:
      return {
        ...state,
        user: action.payload.login,
        isAuth: action.payload.token
      }
    case AUTH_ERROR:
      return {
        ...state,
        isAuthError: !state.isAuthError,
        authErrorText: !!state.authErrorText ? '' : action.error
      }

    case ADD_NEW_CONTACT_RECIEVE:
      return {
        ...state,
      }
    case GET_CONTACTS_RECIEVE:
      return {
        ...state,
        friends: [...action.payload]
      }
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
    case GET_AUDIOS:
      return {
        ...state,
        audios: [...state.audios, action.payload]
      }
    case GET_DATA_FROM_USER_INPUTS:
      return {
        ...state,
        signUpInfo: Object.assign({}, state.signUpInfo, {
          ...action.payload
        })
      }
    default:
      return state;
  }
}

export default rootReducer;
