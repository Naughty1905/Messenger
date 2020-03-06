import {
  MESSEGE_LOADED,
  SET_SIDEBAR,
  SET_NAVLOADER,
  SET_CONTACTS,
  SET_CONVERSATIONS,
  SET_MODAL_ADD_CONTACT
} from '../actions/action-types';

const initialState = {
  messege: '',
  messeges: [],
  isNav: false,
  navLoader: false,
  isContact: false,
  isConversation: true,
  isModalAddContact: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case MESSEGE_LOADED:
      return {
        ...state,
        messege: action.payload,
        messeges: [state.messege, ...state.messeges]
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
    default:
      return state;
  }
}

export default rootReducer;
