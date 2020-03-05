import { GETTER_CONVERSATIONS, GETTER_MESSAGES, SET_SIDEBAR, SET_NAVLOADER } from './action-types';

const initialState = {
  messages: [{
    id: 1,
    author: 'apple',
    message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    timestamp: new Date().getTime()
  },
  {
    id: 2,
    author: 'orange',
    message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    timestamp: new Date().getTime()
  },
  {
    id: 3,
    author: 'orange',
    message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    timestamp: new Date().getTime()
  },
  {
    id: 4,
    author: 'apple',
    message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    timestamp: new Date().getTime()
  },
  {
    id: 5,
    author: 'apple',
    message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    timestamp: new Date().getTime()
  },
  {
    id: 6,
    author: 'apple',
    message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    timestamp: new Date().getTime()
  },
  {
    id: 7,
    author: 'orange',
    message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    timestamp: new Date().getTime()
  },
  {
    id: 8,
    author: 'orange',
    message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    timestamp: new Date().getTime()
  },
  {
    id: 9,
    author: 'apple',
    message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    timestamp: new Date().getTime()
  },
  {
    id: 10,
    author: 'orange',
    message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    timestamp: new Date().getTime()
  },],
  conversations: [],
  username: '',
  isNav: false,
  navLoader: false,
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GETTER_CONVERSATIONS:
      return {
        ...state
      }
    case SET_SIDEBAR:
      return {
        ...state,
        isNav: !state.isNav
      }
    case SET_NAVLOADER:
      return {
        ...state,
        navLoader: !state.navLoader
      }
    default:
      return state;
  }
}
