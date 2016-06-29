import {applyMiddleware, createStore} from "redux";


const reducer = (initialState = 0, action) => {
  if (action.type === "INC") {
    return initialState + 1;
  } else if (action.type === "DEC") {
    return initialState - 1;
  } else if (action.type === "E") {
    throw new Error("Shihao!!!!");
  }
  return initialState;
}

const logger = (store) => (next) => (action) => {
  console.log("action fired", action);
  // debugger;
  next(action);
}

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    console.log("AHHHHHH!", e);
  }
}

const middleware = applyMiddleware(logger, error);

const store = createStore(reducer, 100, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState())
})


store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "E"});


