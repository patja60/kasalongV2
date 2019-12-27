import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import firebase from "firebase";
import { logoutUser, logoutTeacher, fetchUserData } from "../actions";

import logo19th from "../ksl_logo_19th.jpg";

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.onSignout = this.onSignout.bind(this);
    this.onSignoutTeacher = this.onSignoutTeacher.bind(this);
  }

  onSignout() {
    this.props.logoutUser();
  }

  onSignoutTeacher() {
    this.props.logoutTeacher();
  }

  render() {
    console.log("rerender")
    const { userData, teacherData } = this.props;
    console.log(userData)

    let timeTableButton;
    let registerButton;
    let logoutButton;

    if(userData){
      console.log(userData)
      logoutButton = (
        <Link to="/" onClick={this.onSignout} className="nav-link">
          Logout
        </Link>
      );
      timeTableButton = (
        <Link to="/timetable" className="nav-link">
          <i className="far fa-calendar-alt" /> Time Table
        </Link>
      );
      registerButton = (
        <Link to="/register" className="nav-link">
          <i className="fas fa-pencil-alt" /> Register
        </Link>
      );
    }else if(teacherData) {
      logoutButton = (
        <Link to="/loginteacher" onClick={this.onSignoutTeacher} className="nav-link">
          Logout
        </Link>
      );
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
        <div className="container">
          <img style={{ height: 50, paddingRight: 20 }} src={logo19th} />
          <a className="navbar-brand" href="#">
            KASALONG Regwar
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {timeTableButton}
              </li>
              <li className="nav-item">
                {registerButton}
              </li>
              <li className="nav-item">
                {logoutButton}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.register.userData,
    teacherData: state.register.teacherData,
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, logoutTeacher, fetchUserData }
)(Navbar);
