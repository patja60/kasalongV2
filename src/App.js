import { createStore, combineReducers, applyMiddleware } from 'redux';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router>
          <div className="App">
            <div className="container">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
