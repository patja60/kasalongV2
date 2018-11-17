import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { logoutUser, fetchSubject, fetchUserData } from "../actions";

import SubjectCard from "./parts/SubjectCard";
import SubjectList from "./parts/SubjectList";

import dummy from "./dummy";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSub: 1,
      currentSec: 0
    };

    this.onSubjectClick = this.onSubjectClick.bind(this);
    this.onSectionClick = this.onSectionClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchSubject();
    this.props.fetchUserData();
  }

  onSubjectClick(e) {
    this.setState({ currentSub: e });
    this.setState({ currentSec: 0 });
  }

  onSectionClick(index) {
    this.setState({ currentSec: index });
  }

  onSignout() {
    this.props.logoutUser();
  }

  // onRegister(subjectId, sec) {
  //   if(checkTime(userTime,subjectTime)) {
  //
  //   }else{
  //     //Time conflict
  //     //return
  //   }
  //
  //   if(checkRegistered(userRegisteredSubject, subjectId)) {
  //
  //   }else{
  //     //Already Register this subject
  //     //return
  //   }
  //
  //   firebase.database().ref(`/subject/${subjectId}/${sec}/`)
  //   .transaction((post) => {
  //     if(post) {
  //       let currentStudent = post.currentStudent;
  //       let max = post.max;
  //       let studentList = post.studentList;
  //       if(currentStudent < max){
  //         post.currentStudent = currentStudent+1;
  //         //post.studentList = studentList.append(newStudent);
  //         return post;
  //       }
  //     }
  //   })
  //
  // }
  // 
  // checkTime(userTime, subjectTime) {
  //
  // }
  //
  // checkRegistered(userRegisteredSubject, subjectId) {
  //
  // }

  render() {
    const { currentSub, currentSec } = this.state;

    const user = firebase.auth().currentUser;
    return (
      <div>
        <h1>This is Register Page</h1>
        <h2>You are: {firebase.auth().currentUser.email}</h2>
        <SubjectList subjects={dummy} onSubjectClick={this.onSubjectClick} />
        <SubjectCard
          subId={dummy[currentSub - 1].subId}
          subName={dummy[currentSub - 1].subName}
          sections={dummy[currentSub - 1].sec}
          currentSec={currentSec}
          onSectionClick={this.onSectionClick}
        />
        <Link
          onClick={this.onSignout.bind(this)}
          to="/"
          className="btn btn-secondary btn-block"
        >
          Sign out
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { logoutUser, fetchSubject, fetchUserData }
)(Register);
