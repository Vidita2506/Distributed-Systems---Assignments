const LOGIN_USER = "LOGIN_USER";

const initialState = {
  email: ''
};

function rootReducer(state = initialState, action) {
  if (action.type === LOGIN_USER) {
      console.log(action.payload);
      return Object.assign({}, state, action.payload );
  }
  return state;
}
  
export default rootReducer;