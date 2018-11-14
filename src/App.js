// import { createStore, applyMiddleware, compose } from "redux";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import ReduxThunk from "redux-thunk";
import reducers from "./reducers";

import Routes from "./components/Routes";

import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './configStore';

class App extends Component {
  componentWillMount() {

  }
  render() {
    // const store = createStore(
    //   reducers,
    //   {},
    //   compose(
    //     applyMiddleware(ReduxThunk),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //       window.__REDUX_DEVTOOLS_EXTENSION__()
    //   )
    // );
    return (
      <Provider
        store={store}
      >
        <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <div className="container">
              <Routes />
            </div>
          </div>
        </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
