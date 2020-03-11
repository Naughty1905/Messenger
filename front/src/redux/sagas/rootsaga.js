import { call, put, takeLatest } from "redux-saga/effects";
import { REG_NEW_USER_REQUEST, LOGIN_REQUEST, ADD_NEW_CONTACT_REQUEST, GET_CONTACTS_REQUEST, START_CHAT_REQUEST, GET_CONVERSATIONS_REQUEST } from '../actions/action-types';
import { regNewUserRec, setAuthError, addNewContactRec, getContactsRec, startChatRec, getConversationsRec } from "../actions/actions";
import { fetchReg, fetchLogin, fetchAddNewContact, fetchAllFriends, fetchStartChat, fetchConversations, addReadMessages } from '../utils/authFetch';



function* fetchRegAsync(obj) {
  const { login, name, email, password, avatar } = obj;
  try {
    const data = yield call(fetchReg, login, name, email, password, avatar)
    if (!data) {
      return;
    }
    yield put(regNewUserRec(data));
  } catch (e) {
    const error = 'Auth Error';
    yield put(setAuthError(error))
  }
}

function* fetchLoginAsync(obj) {
  const { login, password } = obj;
  try {
    const data = yield call(fetchLogin, login, password)
    if (!data) {
      return;
    }
    yield put(regNewUserRec(data));
  } catch (e) {
    const error = 'Login Error'
    yield put(setAuthError(error))
  }
}


function* fetchAllConctactsAsync(obj) {
  const { isAuth } = obj;
  try {
    const data = yield call(fetchAllFriends, isAuth)
    if (!data) {
      return;
    }
    yield put(getContactsRec(data));
  } catch (e) {
    // const error = `Contact Error`
    yield put(setAuthError())
  }
}

function* fetchAddNewContactAsync(obj) {
  const { fullName, login, number, isAuth } = obj;
  try {
    const data = yield call(fetchAddNewContact, fullName, login, number, isAuth)
    yield put(addNewContactRec(data));
  } catch (e) {
    // const error = 'User does not exist!';
    yield put(setAuthError(e))
  }
}

function* fetchStartChatAsync(obj) {

  const { chat, isAuth } = obj;
  try {
    yield call(addReadMessages, chat, isAuth);
    const data = yield call(fetchStartChat, chat)
    yield put(startChatRec(data));
  } catch (e) {
    const error = 'ChatMessage Error!'
    yield put(setAuthError(error))
  }
}

function* fetchConversationsAsync(obj) {
  const { isAuth } = obj;
  try {
    const data = yield call(fetchConversations, isAuth)
    yield put(getConversationsRec(data));
  } catch (e) {
    // const error = 'Conversations Error'
    yield put(setAuthError())
  }
}


export default function* actionWatcher() {
  yield takeLatest(REG_NEW_USER_REQUEST, fetchRegAsync);
  yield takeLatest(LOGIN_REQUEST, fetchLoginAsync);
  yield takeLatest(ADD_NEW_CONTACT_REQUEST, fetchAddNewContactAsync);
  yield takeLatest(GET_CONTACTS_REQUEST, fetchAllConctactsAsync);
  yield takeLatest(START_CHAT_REQUEST, fetchStartChatAsync);
  yield takeLatest(GET_CONVERSATIONS_REQUEST, fetchConversationsAsync);
}


