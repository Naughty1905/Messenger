import {
  SET_SIDEBAR,
  SET_NAVLOADER,
  SET_CONTACTS,
  SET_CONVERSATIONS,
  SET_MODAL_ADD_CONTACT,
  START_CHAT,
  SET_CHAT
} from '../actions/action-types';

const initialState = {
  isNav: false,
  navLoader: false,
  isContact: false,
  isConversation: true,
  isModalAddContact: false,
  isAvailableToWrite: false,
  isChat: false
};

const chatEnvReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case SET_CONVERSATIONS:
      return {
        ...state,
        isContact: false,
        isConversation: true
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
    case START_CHAT:
      return {
        ...state,
        isAvailableToWrite: !!action.payload
      }
    case SET_CHAT: {
      return {
        ...state,
        isChat: !state.isChat,
        isConversation: !state.isConversation
      }
    }
    default:
      return state;
  }
}


export default chatEnvReducer;
