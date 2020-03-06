import { call, put, takeLatest } from "redux-saga/effects";
import { REG_NEW_USER_REQUEST, LOGIN_REQUEST } from '../actions/action-types';
import { regNewUserRec } from "../actions/actions";
import { fetchReg, fetchLogin } from '../utils/authFetch';


function* fetchRegAsync(obj) {
  const { login, fullName, email, password } = obj;
  try {
    const data = yield call(fetchReg, login, fullName, email, password)
    if (!data) {
      return;
    }
    yield put(regNewUserRec(data));
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
}




export default function* actionWatcher() {
  yield takeLatest(REG_NEW_USER_REQUEST, fetchRegAsync);
  yield takeLatest(LOGIN_REQUEST, fetchLoginAsync);
}
