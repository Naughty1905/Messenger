import {
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

export const startChat = payload => {
  return {
    type: START_CHAT,
      payload
  }
}
