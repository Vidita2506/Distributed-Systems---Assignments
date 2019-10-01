import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

store.subscribe(() => {
   console.log('subscribed for login action', store.getState()); 
});

export default store;