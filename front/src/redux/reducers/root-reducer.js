import {
  MESSEGE_LOADED
} from '../actions/action-types';

const initialState = {
  messege: '',
  messeges: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case MESSEGE_LOADED:
      return {
        ...state,
        messege: action.payload,
        messeges: [state.messege, ...state.messeges]
      };
    default:
      return state;
  }
}

export default rootReducer;
