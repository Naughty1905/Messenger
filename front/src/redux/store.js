import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/root-reducer';
// import rootSaga from './sagas/rootsaga';

const initialSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(initialSagaMiddleware),
  ),
);

// initialSagaMiddleware.run(rootSaga);

export default store;
