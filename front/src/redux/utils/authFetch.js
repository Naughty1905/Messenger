import axios from "axios";


export const fetchReg = async (login, fullName, email, password, url = "http://localhost:5000/users") => {
  const { data } = await axios.post(url, {
    login,
    fullName,
    email,
    password
  })

  if (data) {
    localStorage.setItem('token', data.token);
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
  }
  return data;
};

export const fetchAllFriends = async (isAuth, url = "http://localhost:5000/users/contacts/all") => {
  debugger
  const { data } = await axios.post(url, {
    isAuth
  })
  debugger
  return data;
};


export const fetchAddNewContact = async (fullName, login, number, isAuth, url = "http://localhost:5000/users/contacts/") => {
  debugger
  const { data } = await axios.post(url, {
    fullName,
    login,
    number,
    isAuth
  })
  debugger
  return data;
};


