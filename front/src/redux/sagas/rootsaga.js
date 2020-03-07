import { call, put, takeLatest } from "redux-saga/effects";
import { REG_NEW_USER_REQUEST, LOGIN_REQUEST, ADD_NEW_CONTACT_REQUEST, GET_CONTACTS_REQUEST } from '../actions/action-types';
import { regNewUserRec, setAuthError, addNewContactRec, getContactsRec } from "../actions/actions";
import { fetchReg, fetchLogin, fetchAddNewContact, fetchAllFriends } from '../utils/authFetch';



function* fetchRegAsync(obj) {
  const { login, fullName, email, password } = obj;
  try {
    const data = yield call(fetchReg, login, fullName, email, password)
    if (!data) {
      return;
    }
    yield put(regNewUserRec(data));
  } catch (e) {
    yield put(setAuthError())
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
    console.log(e)
    yield put(setAuthError())
  }
}


function* fetchAllConctactsAsync(obj) {
  const { isAuth } = obj;
  try {
    const data = yield call(fetchAllFriends, isAuth)
    if (!data) {
      return;
    }
    debugger
    yield put(getContactsRec(data));
  } catch (e) {
    yield put(setAuthError())
  }
}

function* fetchAddNewContactAsync(obj) {
  const { fullName, login, number, isAuth } = obj;
  try {
    const data = yield call(fetchAddNewContact, fullName, login, number, isAuth)
    yield put(addNewContactRec(data));
  } catch (e) {
    yield put(setAuthError())
  }
}




export default function* actionWatcher() {
  yield takeLatest(REG_NEW_USER_REQUEST, fetchRegAsync);
  yield takeLatest(LOGIN_REQUEST, fetchLoginAsync);
  yield takeLatest(ADD_NEW_CONTACT_REQUEST, fetchAddNewContactAsync);
  yield takeLatest(GET_CONTACTS_REQUEST, fetchAllConctactsAsync);
}


