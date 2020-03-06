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


export const regNewUserReq = (login, fullName, email, password) => ({
  type: REG_NEW_USER_REQUEST,
  login,
  fullName,
  email,
  password
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
