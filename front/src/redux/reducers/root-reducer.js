import { combineReducers } from 'redux';

import userReducer from './user-reducer';
import chatReducer from './chat-reducer';
import chatEnvReducer from './chat-evn-reducer';

const reducers = combineReducers({
  userReducer,
  chatReducer,
  chatEnvReducer
})

export default reducers
