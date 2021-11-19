import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { country } from "./reducers/country.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  country,
  composeEnhancers(applyMiddleware(thunk))
);
