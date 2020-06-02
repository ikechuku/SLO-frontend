import { combineReducers } from 'redux';
import user from './auth.reducer';

const reducers = combineReducers({
  user,
});

// const appReducer = combineReducers({
//   /* your app’s top-level reducers */
// })

// const rootReducer = (state, action) => {
//   if (action.type === 'USER_LOGOUT') {
//     state = undefined
//   }

//   return reducers(state, action)
// }

export default reducers;