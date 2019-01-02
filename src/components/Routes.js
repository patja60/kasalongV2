import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated, TeacherIsAuthenticated, TeacherIsNotAuthenticated } from "./auth";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Timetable from "./Timetable";
import TeacherBoard from "./TeacherBoard";
import LoginTeacher from "./LoginTeacher";
import NotFound from "./NotFound";

export default () => (
  <Switch>
    <Route exact path="/" component={UserIsNotAuthenticated(Login)} />
    <Route exact path="/register" component={UserIsAuthenticated(Register)} />
    <Route exact path="/timetable" component={UserIsAuthenticated(Timetable)} />
    <Route exact path="/loginteacher" component={TeacherIsNotAuthenticated(LoginTeacher)} />
    <Route exact path="/teacherboard" component={TeacherIsAuthenticated(TeacherBoard)} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);
