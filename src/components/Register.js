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
    this.onSignout = this.onSignout.bind(this);
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


/* this funct is the example of performing transaction, if you register from 2 user,
there are delay from 5000 loop, the first user who register will have sentence "Complete transact" at the end.
but 2nd user will perform this transact 2 time at first time it will have no "Complete transact" after that it will perform again
and have "Complete transact"
*/
  onRegister_test2() {

    const { currentSub, currentSec } = this.state;
    const  { subjectData, userData } = this.props;

    let timeProb = true;
    let subjectProb = true;

    const userTime = userData.studentTime;
    const sec = currentSec + 1;
    console.log(subjectData[currentSub].secList[sec]);
    const subjectTime = subjectData[currentSub].secList[sec].subjectTime;
    if (this.checkTime(userTime, subjectTime)) {
      timeProb = false;
    }else{
      console.log("Time confilct")
      return
    }

    const userRegisteredSubject = userData.registeredSubject;
    const subjectIdCheck = parseInt(currentSub) + 1; // find this func later.
    if(this.checkRegistered(userRegisteredSubject, subjectIdCheck)) {
      subjectProb = false
    }else{
      console.log("Already register")
      return
    }
    const subjectId = subjectData[currentSub].subjectId;
    var upvotesRef = firebase.database().ref(`/subject/${subjectId}/secList/${sec}/`);
    upvotesRef.transaction(function (data) {
      console.log("********************************************this is what i read: "+data);
      for (let i = 0; i < 5000; i++) {
        console.log(i);
      }
      console.log("done********");
      if(data.currentStudent < data.capacity){
        data.currentStudent++;
      }else{
        throw "full"
      }
      console.log("return: "+JSON.stringify(data));
      return data;
    }).then(() => {
      console.log("conplete transac")
    }).catch((err) => {
      console.log(err);
    });
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
    var upvotesRef = firebase.database().ref(`/subject/${subjectId}/secList/${sec}/`);
    upvotesRef.transaction(function (data) {
      console.log("********************************************this is what i read: "+data);
      for (let i = 0; i < 5000; i++) {
        console.log(i);
      }
      console.log("done********");
      console.log(data.currentStudent,data.capacity)
      if(data.currentStudent >= data.capacity){
        console.log("throw");
        throw "full"
      }
      return data;
    }).then(() => {
      console.log("conplete transac")

      firebase.database().ref(`/subject/${subjectId}/secList/${sec}/`).once('value').then((snapshot) => {
        let currentStudent =  snapshot.val().currentStudent;
        let capacity = snapshot.val().capacity;
        let studentList = snapshot.val().studentList;

        const newStudent = { username: userData.username, timeStamp: "now" }

        const stpath = ("/subject/" + subjectId + "/secList/" + sec + "/studentList/" + firebase.auth().currentUser.uid);
        const currentpath = "/subject/" + subjectId + "/secList/" + sec + "/currentStudent";
        const regispath = "/student/" + firebase.auth().currentUser.uid + "/registeredSubject";
        const stTimepath = "/student/" + firebase.auth().currentUser.uid + "/studentTime";
        const secDictPath = "/student/" + firebase.auth().currentUser.uid + "/secDict";
        let updateObject = {}

        updateObject[stpath] = newStudent;
        updateObject[currentpath] = (currentStudent+1);
        const newRegisteredSubject = (userRegisteredSubject | subjectId);
        updateObject[regispath] = newRegisteredSubject;
        const newStudentTime = (userTime | subjectTime);
        updateObject[stTimepath] = newStudentTime;

        firebase.database().ref().update(updateObject, (err) => {
          if(err){
            console.log(err);
          }
        })
      });

    }).catch((err) => {
      console.log(err);
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
          <h4>Loading</h4>
        </div>
      );
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
