import axios from "axios";


export const fetchReg = async (login, name, email, password, avatar, url = "http://localhost:5000/users") => {
  debugger
  const { data } = await axios.post(url, {
    login,
    name,
    email,
    password,
    avatar
  })
  if (data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.login);
    debugger
  }
  return data;
};


export const fetchLogin = async (login, password, url = "http://localhost:5000/users/login") => {
  const { data } = await axios.post(url, {
    login,
    password
  })
  debugger
  if (data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.login);
  }
  debugger
  return data;
};

export const fetchAllFriends = async (isAuth, url = "http://localhost:5000/users/contacts/all") => {
  const { data } = await axios.post(url, {
    isAuth
  })
  return data;
};


export const fetchAddNewContact = async (fullName, login, number, isAuth, url = "http://localhost:5000/chats") => {
  try {
    const { data } = await axios.post(url, {
      fullName,
      login,
      number,
      isAuth
    })
    return data;
  } catch (err) {
    return err;
  }
};


export const fetchStartChat = async (chat, url = "http://localhost:5000/chats") => {
  const { data } = await axios.get(url, {
    params: {
      id: chat
    }
  })
  return data;
};

export const fetchConversations = async (isAuth, url = "http://localhost:5000/chats/conversations") => {
  const { data } = await axios.get(url, {
    params: {
      isAuth
    }
  })
  return data;
};

export const addReadMessages = async (chat, isAuth, url = "http://localhost:5000/chats/seen") => {
  const { data } = await axios.post(url, {
    isAuth,
    chat
  })
  return data;
}

