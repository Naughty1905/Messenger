import {
  GET_MESSEGE,
  SET_SIDEBAR,
  SET_NAVLOADER

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
