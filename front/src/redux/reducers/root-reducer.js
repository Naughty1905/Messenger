import {
  GET_MESSAGE,
  SET_MESSAGES,
  SET_SIDEBAR,
  SET_NAVLOADER,
  SET_CONTACTS,
  SET_CONVERSATIONS,
  SET_MODAL_ADD_CONTACT,
  REG_NEW_USER_RECIEVE
} from '../actions/action-types';

const initialState = {
  user: 'Eva',
  isNav: false,
  navLoader: false,
  message: {
    content: '',
    owner: '',
  },
  messages: [],
  isContact: false,
  isConversation: true,
  isModalAddContact: false
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE:
      const { message, user } = action.payload
      return {
        ...state,
        message: {
          content: message,
          owner: user
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
      debugger
      return {
        ...state,
        user: action.payload.user
      }
    default:
      return state;
  }
}

export default rootReducer;
