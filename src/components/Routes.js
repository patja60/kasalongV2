import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./auth";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Temporary from "./Temporary";

export default () => (
  <Switch>
    <Route exact path="/" component={UserIsNotAuthenticated(Login)} />
    <Route exact path="/register" component={UserIsAuthenticated(Register)} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/temporary" component={UserIsAuthenticated(Temporary)} />
  </Switch>
);
