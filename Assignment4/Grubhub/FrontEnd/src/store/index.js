import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

store.subscribe(() => {
   console.log('subscribed for login action', store.getState()); 
});

export default store;