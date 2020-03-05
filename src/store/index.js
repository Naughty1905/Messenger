import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer';
import rootSaga from './sagas/index';
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';


const saga = createSagaMiddleware();

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(saga)
  )
);

saga.run(rootSaga);
