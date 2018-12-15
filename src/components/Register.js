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
    const  { subjectData, userData } = this.props;

    let timeProb = true;
    let subjectProb = true;

    const userTime = userData.studentTime;
    const sec = currentSec + 1;
    console.log(subjectData[currentSub].secList[sec])
    const subjectTime = subjectData[currentSub].secList[sec].subjectTime;
    if(this.checkTime(userTime,subjectTime)) {
      timeProb = false;
    }else{
      console.log("Time confilct")
      return
    }

    const userRegisteredSubject = userData.registeredSubject;
    console.log("currentSub" + currentSub);
    const subjectIdCheck = parseInt(currentSub) + 1; // find this func later.
    if(this.checkRegistered(userRegisteredSubject, subjectIdCheck)) {
      subjectProb = false
    }else{
      console.log("Already register")
      return
    }
    const subjectId = subjectData[currentSub].subjectId;
    firebase.database().ref(`/subject/${subjectId}/secList/${sec}/`)
    .transaction((post) => {
      if(post) {
        setTimeout(() => {this.test(post);}, 5000);
      }
    })

  }

  test(post){
    console.log("delay here")
    const { currentSub, currentSec } = this.state;
    const  { subjectData, userData } = this.props;

    let timeProb = true;
    let subjectProb = true;

    const userTime = userData.studentTime;
    const sec = currentSec + 1;
    const subjectId = subjectData[currentSub].subjectId;
    const subjectTime = subjectData[currentSub].secList[sec].subjectTime;
    const userRegisteredSubject = userData.registeredSubject;

    //above

    let currentStudent = post.currentStudent;
    let capacity = post.capacity;
    let studentList = post.studentList;

    const newStudent = { username: userData.username, timeStamp: "now" }
    if(currentStudent < capacity){
      const stpath = ("/subject/" + subjectId + "/secList/" + sec + "/studentList/" + firebase.auth().currentUser.uid);
      // const currentpath = "/subject/" + subjectId + "/secList/" + sec + "/currentStudent";
      const regispath = "/student/" + firebase.auth().currentUser.uid + "/registeredSubject";
      const stTimepath = "/student/" + firebase.auth().currentUser.uid + "/studentTime";
      const secDictPath = "/student/" + firebase.auth().currentUser.uid + "/secDict";
      let updateObject = {}

      updateObject[stpath] = newStudent;
      // updateObject[currentpath] = (currentStudent+1);
      post.currentStudent = currentStudent+1;
      const newRegisteredSubject = (userRegisteredSubject | subjectId);
      updateObject[regispath] = newRegisteredSubject;
      const newStudentTime = (userTime | subjectTime);
      updateObject[stTimepath] = newStudentTime;

      firebase.database().ref().update(updateObject, (err) => {
        if(err){
          console.log(err);
          return post;
        }
      })
    }else{
      console.log("Full")
    }
  }

  checkTime(userTime, subjectTime) {
    if((userTime & subjectTime) === 0){
      return true;
    }
    return false;
  }

  checkRegistered(userRegisteredSubject, subjectId) {
    if((userRegisteredSubject & subjectId) === 0){
      return true;
    }
    return false;
  }

  render() {
    const { currentSub, currentSec } = this.state;
    const  { subjectData } = this.props;
    //console.log("real data: ", subjectData)

    if(subjectData){
      return (
        <div>
          <h4>Welcome : {firebase.auth().currentUser.email}</h4>
          <SubjectList subjects={subjectData} onSubjectClick={this.onSubjectClick} />
          <SubjectCard
            subId={subjectData[currentSub].subjectId}
            subName={subjectData[currentSub].subjectName}
            sections={subjectData[currentSub].secList}
            currentSec={currentSec}
            onSectionClick={this.onSectionClick}
          />
          <button onClick={this.onRegister.bind(this)}> register
          </button>

          <Link
            onClick={this.onSignout.bind(this)}
            to="/"
            className="btn btn-secondary btn-block"
          >
            Logout
          </Link>
        </div>
      );
    }else{
      return (
        <div>
          <h4>Loading</h4>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    subjectData: state.register.subjectData,
    userData: state.register.userData,
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, fetchSubject, fetchUserData }
)(Register);
