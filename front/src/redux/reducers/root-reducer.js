import {
  MESSEGE_LOADED,
  SET_SIDEBAR,
  SET_NAVLOADER,
} from '../actions/action-types';

const initialState = {
  messege: '',
  messeges: [],
  isNav: false,
  navLoader: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case MESSEGE_LOADED:
      return {
        ...state,
        messege: action.payload,
        messeges: [state.messege, ...state.messeges]
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
