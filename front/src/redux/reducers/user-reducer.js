import {
  SET_CONTACTS,
  SET_MODAL_ADD_CONTACT,
  REG_NEW_USER_RECIEVE,
  AUTH_ERROR,
  ADD_NEW_CONTACT_RECIEVE,
  GET_CONTACTS_RECIEVE,
  GET_DATA_FROM_USER_INPUTS,
} from '../actions/action-types';


const initialState = {
  signUpInfo: {
    name: '',
    email: '',
    password: '',
    avatar: ''
  },
  user: localStorage.getItem('user') || '',
  isModalAddContact: false,
  isAuth: localStorage.getItem('token') || false,
  isAuthError: false,
  authErrorText: '',
  friends: [],
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        isContact: true,
        isNav: false,
        isConversation: false
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

export default userReducer;
