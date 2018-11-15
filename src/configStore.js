import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";


export const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// export const store = createStore(pReducer,compose(
//   applyMiddleware(ReduxThunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()
// ));
