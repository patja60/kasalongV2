import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  logoutUser,
  fetchSubject
} from "../actions";

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
          to="/"
          onClick={this.onSignout.bind(this)}
          className="btn btn-primary btn-block"
        >
          Sign out
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username:  state.auth.username,
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, fetchSubject }
)(Register);
