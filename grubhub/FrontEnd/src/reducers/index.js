const LOGIN_USER = "LOGIN_USER";
const SIGN_UP_USER = "SIGN_UP_USER";

const initialState = {}

function rootReducer(state = initialState, action) {
  if (action.type === LOGIN_USER) {
      return Object.assign({}, state, action.payload );
  }
  if (action.type === SIGN_UP_USER) {
    return Object.assign({}, state, action.payload);
  }
  return state;
}
  
export default rootReducer;