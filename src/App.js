import { createStore, applyMiddleware, compose } from 'redux';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <Provider
        store={createStore(
          reducers,
          {},
          compose(
            applyMiddleware(ReduxThunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
              window.__REDUX_DEVTOOLS_EXTENSION__()
          )
        )}
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
