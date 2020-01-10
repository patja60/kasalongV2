import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { logoutUser, fetchSubject, fetchUserData } from "../actions";

import SubjectCard from "./parts/SubjectCard";
import SubjectList from "./parts/SubjectList";
import GenedList from "./parts/GenedList";
import RegisteredSubjects from "./parts/RegisteredSubjects";
import time from "./clickedTime"

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSub: 0,
      currentSec: 0,
      deleteSub: null,
      deleteSec: null,
      regisPressed: false,
      deletePressd: false,
    };

    this.onSubjectClick = this.onSubjectClick.bind(this);
    this.onSectionClick = this.onSectionClick.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onSignout = this.onSignout.bind(this);
    this.onDelete = this.onDelete.bind(this);
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

  countOrdiSub(userData,subjectData,currentSub) {
    const secDict = userData.secDict;
    if(!secDict){
      return 0;
    }
    if(parseInt(subjectData[currentSub].subjectId.substring(5,7)) <= 20 ){
      console.log("count Group 1 sub")
      if(this.counterGroup1Sub(userData)>= 3){
        alert("Only maximum 3 of Group 1 subject can be registered.")
        console.log("max.");
        this.setState({regisPressed: false})
        return true;
      }
    }
    else {
      if ((21 <= parseInt(subjectData[currentSub].subjectId.substring(5,7))) && ( parseInt(subjectData[currentSub].subjectId.substring(5,7)) <= 29)){
      console.log("count Group 2 sub")
      if(this.counterGroup2Sub(userData)>= 2){
        alert("Only maximum 2 of Group 2 subject can be registered.")
        console.log("max.");
        this.setState({regisPressed: false})
        return true;
      }
    }}
    }

  counterGroup1Sub(userData) {
    const secDict = userData.secDict;
    if (!secDict){
      return 0;
    }
    let counterGr1 = 0;
    Object.keys(secDict).forEach((key) => {
      console.log(parseInt(key.substring(5,7)));
      if(parseInt(key.substring(5,7)) <=20){
        counterGr1++;
        console.log(key.substring(5,7))
      }
    })
    return counterGr1;
  }

  counterGroup2Sub(userData) {
    const secDict = userData.secDict;
    if (!secDict){
      return 0;
    }
    let counterGr2 = 0;
    Object.keys(secDict).forEach((key) => {
      console.log(parseInt(key.substring(5,7)));
      if( (21 <= parseInt(key.substring(5,7))) && (parseInt(key.substring(5,7))<= 29)){
        counterGr2++;
        console.log(key.substring(5,7))
      }
    })
    return counterGr2;
  }
  

  // this method takes two parameters subjectId and sec
  onDelete(subId, sec) {
    if (this.state.deletePressd) {
      return;
    }
    this.setState({ deletePressd: true });
    const result = window.confirm(
      `Are you sure to remove ${subId.substring(2,7)}, sec ${sec}?`
    );
    if (result) {
      //console.log(`delete: subId=${subId}, sec=${sec}`);
      // if the student click yes,
      // remove the specified subId and sec from this students registration
      const { subjectData, userData } = this.props;
      console.log(userData);

      const userTime = userData.studentTime;
      const deleteSub = parseInt(subId.substring(0, 2));
      const deleteSubIndex = deleteSub; // -1 to change to index for subjectData[index]
      const subjectTime = subjectData[deleteSubIndex].secList[sec].subjectTime;

      const userRegisteredSubject = userData.registeredSubject;
      const subjectIdCheck = Math.pow(2, deleteSub);

      const subjectId = subjectData[deleteSubIndex].subjectId;

      var secRef = firebase
        .database()
        .ref(`/subject/${subjectId}/secList/${sec}/`);
      secRef
        .transaction(data => {
           // console.log("**********************this is what i read: "+data+"**********************");
          data.currentStudent--;
          return data;
        })
        .then(() => {
          // console.log("this student is reserved, but if the transaction after this failed, nothing will be damage.")
          firebase
            .database()
            .ref(`/subject/${subjectId}/secList/${sec}/`)
            .once("value")
            .then(snapshot => {
              let updateObject = {};

              updateObject[
                "/subject/" +
                  subjectId +
                  "/secList/" +
                  sec +
                  "/studentList/" +
                  firebase.auth().currentUser.uid
              ] = null;
              updateObject[
                "/student/" +
                  firebase.auth().currentUser.uid +
                  "/registeredSubject"
              ] = userRegisteredSubject - subjectIdCheck;
              updateObject[
                "/student/" + firebase.auth().currentUser.uid + "/studentTime"
              ] = userTime - subjectTime;
              updateObject[
                "/student/" +
                  firebase.auth().currentUser.uid +
                  "/secDict/" +
                  subjectId
              ] = null;

              firebase
                .database()
                .ref()
                .update(updateObject, err => {
                  if (err) {
                    console.log(
                      "Sorry something went wrong, please try again."
                    );
                    alert("Sorry something went wrong, please try again.");
                    var secRef = firebase
                      .database()
                      .ref(`/subject/${subjectId}/secList/${sec}/`);
                    secRef.transaction(data => {
                      data.currentStudent++;
                      return data;
                    });
                    console.log(err);
                  }
                });
              this.setState({ deletePressd: false });
            });
        })
        .catch(err => {
          this.setState({ deletePressd: false });
          console.log(err);
        });
    } else {
      console.log("no");
      this.setState({ deletePressd: false });
    }
  }

  /* this funct is the example of performing transaction, if you register from 2 user,
  there are delay from 5000 loop, the first user who register will have sentence "Complete transact" at the end.
  but 2nd user will perform this transact 2 time at first time it will have no "Complete transact" after that it will perform again
  and have "Complete transact"
  */
  onRegister() {
    if (this.state.regisPressed) {
      return;
    }
    this.setState({ regisPressed: true });
    const { currentSub, currentSec } = this.state;
    const { subjectData, userData } = this.props;

    console.log(subjectData[currentSub].subjectId.substring(5,7))
    if (this.countOrdiSub(userData,subjectData,currentSub)) {
      return
    }

    const userTime = userData.studentTime;
    const sec = currentSec + 1;
    console.log(subjectData[currentSub].secList[sec]);
    const subjectTime = subjectData[currentSub].secList[sec].subjectTime;
    if (!this.checkTime(userTime, subjectTime)) {
      alert("Time confilct");
      console.log("Time confilct.");
      this.setState({ regisPressed: false });
      return;
    }

    const userRegisteredSubject = userData.registeredSubject;
    let subjectIdCheck = parseInt(subjectData[currentSub].subjectId.substring(0, 2));
    subjectIdCheck = Math.pow(2, subjectIdCheck);
    if (!this.checkRegistered(userRegisteredSubject, subjectIdCheck)) {
      alert(
        subjectData[currentSub].subjectId.substring(2,7) +
          " (" +
          subjectData[currentSub].subjectName +
          ") " +
          " is already register."
      );
      console.log("Already register");
      this.setState({ regisPressed: false });
      return;
    }

    const subjectId = subjectData[currentSub].subjectId;
    var secRef = firebase
      .database()
      .ref(`/subject/${subjectId}/secList/${sec}/`);
    secRef
      .transaction(data => {
        // console.log("**********************this is what i read: "+data+"**********************");
        // for (let i = 0; i < 5000; i++) {
        //   console.log(i);
        // }
        // console.log("********done********");
        if (data.currentStudent >= data.capacity) {
          alert("This section is full.");
          this.setState({ regisPressed: false });
          throw "full";
        } else {
          data.currentStudent++;
        }
        return data;
      })
      .then(() => {
        // console.log("this student is reserved, but if the transaction after this failed, nothing will be damage.")
        firebase
          .database()
          .ref(`/subject/${subjectId}/secList/${sec}/`)
          .once("value")
          .then(snapshot => {
            let updateObject = {};

            updateObject[
              "/subject/" +
                subjectId +
                "/secList/" +
                sec +
                "/studentList/" +
                firebase.auth().currentUser.uid
            ] = { username: userData.username, timeStamp: time }; // now == time
            updateObject[
              "/student/" +
                firebase.auth().currentUser.uid +
                "/registeredSubject"
            ] = userRegisteredSubject | subjectIdCheck;
            updateObject[
              "/student/" + firebase.auth().currentUser.uid + "/studentTime"
            ] = userTime | subjectTime;
            updateObject[
              "/student/" +
                firebase.auth().currentUser.uid +
                "/secDict/" +
                subjectId
            ] = sec;
      
            firebase
              .database()
              .ref()
              .update(updateObject, err => {
                if (err) {
                  alert("Sorry something went wrong, please try again.");
                  console.log("Sorry something went wrong, please try again.");
                  var secRef = firebase
                    .database()
                    .ref(`/subject/${subjectId}/secList/${sec}/`);
                  secRef.transaction(data => {
                    data.currentStudent--;
                    return data;
                  });
                  console.log(err);
                }
              });
            this.setState({ regisPressed: false });
          });
      })
      .catch(err => {
        this.setState({ regisPressed: false });
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
    const { userData, subjectData } = this.props;
    //console.log("real data: ", subjectData)
    
    if (userData && subjectData) {
      return (
        <div className="mb-5">
          <h4>Welcome : {userData.username}</h4>
          <div className="row">
            <div className="col-sm-6">
              <SubjectList
                subjects={subjectData.slice(0, 9)}
                onSubjectClick={this.onSubjectClick}
              />
            </div>
            <div className="col-sm-6">
              <GenedList
                subjects={subjectData.slice(9, 20)}
                onSubjectClick={this.onSubjectClick}
              />
            </div>
          </div>

          <SubjectCard
            subId={subjectData[currentSub].subjectId}
            subName={subjectData[currentSub].subjectName}
            sections={subjectData[currentSub].secList}
            currentSec={currentSec}
            onSectionClick={this.onSectionClick}
            onRegister={this.onRegister}
          />
          <RegisteredSubjects
            userData={this.props.userData}
            subjectData={this.props.subjectData}
            onDelete={this.onDelete}
          />
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
    userData: state.register.userData
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, fetchSubject, fetchUserData }
)(Register);
