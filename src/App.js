import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "./components/Routes";

import { store } from './configStore';
import * as Actions from './actions';

class App extends Component {
  componentWillMount() {
     store.dispatch(Actions.verifyAuth());
  }

  render() {
    return (
      <Provider
        store={store}
      >
        <Router>
          <div className="App">
            <div className="container">
              <Routes />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
