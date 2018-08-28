import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashboard} />
  </Switch>
);
