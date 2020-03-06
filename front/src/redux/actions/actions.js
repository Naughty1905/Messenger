import {
  GET_MESSEGE,
  SET_SIDEBAR,
  SET_NAVLOADER,
  SET_CONTACTS,
  SET_CONVERSATIONS,
  SET_MODAL_ADD_CONTACT
} from './action-types';

export const getMessge = (payload) => ({
  type: GET_MESSEGE,
  payload,
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
