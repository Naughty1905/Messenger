import {
  GET_MESSAGE,
  SET_MESSAGES,

  REG_NEW_USER_REQUEST,
  REG_NEW_USER_RECIEVE,

  LOGIN_REQUEST,
  LOGIN_RECIEVE,

  AUTH_ERROR,
} from './action-types';

export const getMessage = (payload) => ({
  type: GET_MESSAGE,
  payload
});

export const setMessages = (payload) => {
  return {
    type: SET_MESSAGES,
    payload
  }
};

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


