import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { logoutUser, fetchSubject } from "../actions";

import SubjectCard from "./parts/SubjectCard";
import SubjectList from "./parts/SubjectList";

import dummy from "./dummy";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSub: 1
    };

    this.onSubjectClick = this.onSubjectClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchSubject();
  }

  onSubjectClick(e) {
    this.setState({ currentSub: e });
  }

  onSignout() {
    this.props.logoutUser();
  }

  render() {
    const { currentSub } = this.state;
    console.log("currentSub in render: ", currentSub);
    var user = firebase.auth().currentUser;
    console.log("current user: ", user);
    // if (!user) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div>
        <h1>This is Register Page</h1>
        <h2>You are: {this.props.username}</h2>
        <SubjectList subjects={dummy} onSubjectClick={this.onSubjectClick} />
        <SubjectCard
          subName={dummy[currentSub - 1].subName}
          content={dummy[currentSub - 1].period}
        />
        <Link
          onClick={this.onSignout.bind(this)}
          to="/"
          className="btn btn-primary btn-block"
        >
          Sign out
        </Link>
      </div>
    );
  }
}

// <Link
//   to="/"
//   onClick={this.onSignout.bind(this)}
//   className="btn btn-primary btn-block"
// >
//   Sign out
// </Link>

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, fetchSubject }
)(Register);
