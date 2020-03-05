import {
  GET_MESSAGE,
  SET_MESSAGES,
  SET_SIDEBAR,
  SET_NAVLOADER,
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
    case SET_SIDEBAR:
      return {
        ...state,
        isNav: !state.isNav
      }
    case SET_NAVLOADER:
      return {
        ...state,
        navLoader: !state.navLoader
      }

    default:
      return state;
  }
}

export default rootReducer;
