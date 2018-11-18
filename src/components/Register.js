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
    // const sec = currentSec+1;
    // firebase.database().ref(`/subject/${subjectId}/secList/${sec}/`)
    // .transaction((post) => {
    //   if(post) {
    //     let currentStudent = post.currentStudent;
    //     let capacity = post.capacity;
    //     let studentList = post.studentList;
    //     const newStudent = {name: firebase.auth().currentUser.username, time: ??}
    //     if(currentStudent < capacity){
    //       post.currentStudent = currentStudent+1;
    //       if(!studentList){
    //         post.child(studentList).push(newStudent)
    //       }else{
    //         //post.studentList = studentList.push(newStudent);
    //       }
    //       return post;
    //     }
    //   }
    // })
  //
  // }
  //
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
      const sec = currentSec + 1;
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
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, fetchSubject, fetchUserData }
)(Register);
