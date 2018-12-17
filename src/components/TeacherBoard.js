import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";
import { Link, Redirect } from "react-router-dom";
import {
  logoutTeacher
  } from '../actions';

class TeacherBoard extends Component {
  constructor(props) {
    super(props);
    this.onSignout = this.onSignout.bind(this);
  }

  onSignout() {
    this.props.logoutTeacher();
  }

  render() {
    const { subjectData } = this.props;
    //console.log("real data: ", subjectData)

    if (subjectData) {
      return (
        <div>
          <h4>Welcome : {firebase.auth().currentUser.email}</h4>

          <Link
            onClick={this.onSignout}
            to="/"
            className="btn btn-secondary btn-block"
          >
            Logout
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Loading Teacher</h4>
          <Link
            onClick={this.onSignout}
            to="/"
            className="btn btn-secondary btn-block"
          >
            Logout
          </Link>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    subjectData: state.register.subjectData
  };
};

export default connect(
  mapStateToProps,
  { logoutTeacher }
)(TeacherBoard);
