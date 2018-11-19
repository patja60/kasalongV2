import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { logoutUser, fetchSubject, fetchUserData } from "../actions";

import SubjectCard from "./parts/SubjectCard";
import SubjectList from "./parts/SubjectList";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSub: 0,
      currentSec: 0
    };

    this.onSubjectClick = this.onSubjectClick.bind(this);
    this.onSectionClick = this.onSectionClick.bind(this);
    this.onRegister = this.onRegister.bind(this);
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

  onRegister() {
    const { currentSub, currentSec } = this.state;
    const { subjectData } = this.props;

    let timeProb = true;
    let subjectProb = true;

    const userTime = firebase.auth().currentUser.studentTime;
    const sec = currentSec + 1;
    console.log(subjectData[currentSub].secList[sec]);
    const subjectTime = subjectData[currentSub].secList[sec].subjectTime;
    if (this.checkTime(userTime, subjectTime)) {
      timeProb = false;
    } else {
      //Time conflict
      //return
    }

    const userRegisteredSubject = firebase.auth().currentUser.registeredSubject;
    const subjectIdCheck = parseInt(currentSub); // find this func later.
    if (this.checkRegistered(userRegisteredSubject, subjectIdCheck)) {
      subjectProb = false;
    } else {
      //Already Register this subject
      //return
    }
    console.log(timeProb, subjectProb);
    firebase
      .database()
      .ref(`/subject/${subjectData[currentSub].subjectId}/secList/${sec}/`)
      .once("value", function(snapshot) {
        console.log("data: " + JSON.stringify(snapshot.val()));
      });
    const subjectId = subjectData[currentSub].subjectId;
    firebase
      .database()
      .ref(`/subject/${subjectId}/secList/${sec}/`)
      .transaction(post => {
        console.log(post);
        if (post) {
          let currentStudent = post.currentStudent;
          let capacity = post.capacity;
          let studentList = post.studentList;
          const newStudent = {
            name: firebase.auth().currentUser.email,
            timeStamp: "now"
          };
          console.log(newStudent);
          console.log(currentStudent < capacity);
          if (currentStudent < capacity) {
            post.currentStudent += 1;
            firebase
              .database()
              .ref(`/subject/${subjectId}/secList/${sec}/studentList/`)
              .push(newStudent);
          }
        }
      });
  }

  checkTime(userTime, subjectTime) {
    if ((userTime & subjectTime) === 0) {
      return true;
    }
    return false;
  }

  checkRegistered(userRegisteredSubject, subjectId) {
    if ((userRegisteredSubject & subjectId) === 0) {
      return true;
    }
    return false;
  }

  render() {
    const { currentSub, currentSec } = this.state;
    const { subjectData } = this.props;
    //console.log("real data: ", subjectData)

    if (subjectData) {
      return (
        <div>
          <h4>Welcome : {firebase.auth().currentUser.email}</h4>
          <SubjectList
            subjects={subjectData}
            onSubjectClick={this.onSubjectClick}
          />
          <SubjectCard
            subId={subjectData[currentSub].subjectId}
            subName={subjectData[currentSub].subjectName}
            sections={subjectData[currentSub].secList}
            currentSec={currentSec}
            onSectionClick={this.onSectionClick}
            onRegister={this.onRegister}
          />

          <Link
            onClick={this.onSignout.bind(this)}
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
          <h4>Loading</h4>
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
  { logoutUser, fetchSubject, fetchUserData }
)(Register);
