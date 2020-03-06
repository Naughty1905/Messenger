import axios from "axios";


export const fetchReg = async (login, fullName, email, password, url = "http://localhost:5000/users") => {
  debugger
  const { data } = await axios.post(url, {
    login,
    fullName,
    email,
    password
  })

  if (data) {
    localStorage.setItem('userName', data);
  }
  debugger
  return data;
};


export const fetchLogin = async (login, password, url = "http://localhost:5000/users/login") => {
  debugger
  const { data } = await axios.post(url, {
    login,
    password
  })

  if (data) {
    localStorage.setItem('userName', data);
  }
  debugger
  return data;
};
