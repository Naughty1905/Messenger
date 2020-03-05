import { takeEvery, put } from 'redux-saga/effects';
import {
  GET_MESSEGE,
  MESSEGE_LOADED,
  GET_MESSEGE_ERROR
} from '../actions/action-types';

export function* messegeSaga() {
  yield takeEvery(GET_MESSEGE, workerMessegeSaga)
};

function* workerMessegeSaga(action) {
  const { payload } = action;
  try {
    yield put({ type: MESSEGE_LOADED, payload });
  } catch (err) {
    yield put({ type: GET_MESSEGE_ERROR, payload: err });
  }
};

