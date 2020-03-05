import { GETTER_CONVERSATIONS, GETTER_MESSAGES, SET_SIDEBAR, SET_NAVLOADER } from './action-types';

export const getterConversations = (payload) => ({
  type: GETTER_CONVERSATIONS,
  payload
})


export const getterMessages = (payload) => ({
  type: GETTER_MESSAGES,
  payload
})


export const setSidebar = () => ({
  type: SET_SIDEBAR
})


export const setLoaderNav = () => ({
  type: SET_NAVLOADER
})



export default {
  getterConversations,
  getterMessages,
  setSidebar,
  setLoaderNav
}
