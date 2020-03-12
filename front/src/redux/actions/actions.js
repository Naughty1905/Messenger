import {
  GET_MESSAGE,
  SET_MESSAGES,

  SET_SIDEBAR,

  SET_NAVLOADER,

  SET_CONTACTS,
  SET_CONVERSATIONS,

  SET_MODAL_ADD_CONTACT,

  REG_NEW_USER_REQUEST,
  REG_NEW_USER_RECIEVE,

  LOGIN_REQUEST,
  LOGIN_RECIEVE,

  AUTH_ERROR,

  ADD_NEW_CONTACT_REQUEST,
  ADD_NEW_CONTACT_RECIEVE,

  GET_CONTACTS_REQUEST,
  GET_CONTACTS_RECIEVE,

  START_CHAT_REQUEST,
  START_CHAT_RECIEVE,

  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATIONS_RECIEVE,

  SET_RECORDING,

  GET_DATA_FROM_USER_INPUTS,
  START_CHAT
} from './action-types';

export const getMessage = (payload) => ({
  type: GET_MESSAGE,
  payload
});

export const setMessages = (payload) => ({
  type: SET_MESSAGES,
  payload
});

export const setSidebar = () => ({
  type: SET_SIDEBAR
})


export const setLoaderNav = () => ({
  type: SET_NAVLOADER
})

export const setContacts = () => ({
  type: SET_CONTACTS
})


export const setConversations = () => ({
  type: SET_CONVERSATIONS
})


export const setModalAddContact = () => ({
  type: SET_MODAL_ADD_CONTACT
})


export const regNewUserReq = (login, name, email, password, avatar) => ({
  type: REG_NEW_USER_REQUEST,
  login,
  name,
  email,
  password,
  avatar
})

export const regNewUserRec = (payload) => ({
  type: REG_NEW_USER_RECIEVE,
  payload
})

export const loginReq = (login, password) => ({
  type: LOGIN_REQUEST,
  login,
  password
})

export const loginRec = (payload) => ({
  type: LOGIN_RECIEVE,
  payload
})

export const setAuthError = (error) => ({
  type: AUTH_ERROR,
  error
})

export const addNewContactReq = (fullName, login, number, isAuth) => ({
  type: ADD_NEW_CONTACT_REQUEST,
  fullName,
  login,
  number,
  isAuth
})

export const addNewContactRec = (payload) => ({
  type: ADD_NEW_CONTACT_RECIEVE,
  payload
})

export const getContactsReq = (isAuth) => ({
  type: GET_CONTACTS_REQUEST,
  isAuth
})

export const getContactsRec = (payload) => ({
  type: GET_CONTACTS_RECIEVE,
  payload
})


export const startChatReq = (chat, isAuth) => {
  return {
    type: START_CHAT_REQUEST,
    chat,
    isAuth
  }
}

export const startChatRec = (payload) => ({
  type: START_CHAT_RECIEVE,
  payload
})

export const getConversationsReq = (isAuth) => ({
  type: GET_CONVERSATIONS_REQUEST,
  isAuth
})

export const getConversationsRec = (payload) => ({
  type: GET_CONVERSATIONS_RECIEVE,
  payload
})


export const setRecording = () => ({
  type: SET_RECORDING
});


export const getDataFromUserInputs = (payload) => ({
  type: GET_DATA_FROM_USER_INPUTS,
  payload
})

export const startChat = payload => ({
  type: START_CHAT,
  payload
})
