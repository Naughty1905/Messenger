import axios from "axios";
import { database } from '../../Firebase'


export const fetchReg = async (login, name, email, password, avatar, url = "http://localhost:5000/users") => {
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
  }
  return data;
};


export const fetchLogin = async (login, password, url = "http://localhost:5000/users/login") => {
  const { data } = await axios.post(url, {
    login,
    password
  })
  if (data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.login);
  }
  return data;
};

export const fetchAllFriends = async (isAuth, url = "http://localhost:5000/users/contacts/all") => {
  const token = isAuth
  const response = await fetch(url, {
    method: 'post',
    headers: {
      "Authorization": `${token}`,
    },
  });

  const data = await response.json();
  return data;
};


export const fetchAddNewContact = async (login, isAuth, url = "http://localhost:5000/chats") => {
  const token = isAuth
  try {
    const { data } = await fetch(url, {
      method: 'post',
      headers: {
        "Authorization": `${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ login })
    })
    debugger
    database.ref(`/chats/${data._id}`).push({})
    return data;
  } catch (err) {
    return err;
  }
};


export const fetchStartChat = async (chat) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:5000/chats/?id=${chat}`, {
    method: 'get',
    headers: {
      "Authorization": `${token}`,
      "content-type": "apllication/json",
    }
  })

  const data = await response.json()
  return data;
};

export const fetchConversations = async (isAuth, url = "http://localhost:5000/chats/conversations") => {
  const token = isAuth;
  const response = await fetch(url, {
    method: 'get',
    headers: {
      "Authorization": `${token}`,
    },
    params: {
      isAuth
    }
  });
  const data = await response.json();
  return data;
};

export const addReadMessages = async (chat, isAuth, url = "http://localhost:5000/chats/seen") => {
  const token = isAuth;
  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        "Authorization": `${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ chat: chat })
    })
    const data = await response.json();

    return data;
  } catch (err) {
    return err;
  }
}
