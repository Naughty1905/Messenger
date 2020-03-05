import {
  GET_MESSAGE,
  SET_MESSAGES,
  SET_SIDEBAR,
  SET_NAVLOADER

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
