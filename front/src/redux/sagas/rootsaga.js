import { all, fork } from 'redux-saga/effects';

// Sagas
import { messegeSaga } from './messegeSaga';

export default function* rootSaga() {
  yield all([
    fork(messegeSaga),
  ]);
}
