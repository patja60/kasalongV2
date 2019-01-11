import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { Link, Redirect } from "react-router-dom";
import { logoutTeacher, fetchTeacher } from "../actions";
import StudentList from "./parts/StudentList";
import { mapToDateTime } from "./DateTime";
class TeacherBoard extends Component {
  constructor(props) {
    super(props);
    this.onSignout = this.onSignout.bind(this);
  }

  componentWillMount() {
    this.props.fetchTeacher();
  }

  onSignout() {
    this.props.logoutTeacher();
  }

  render() {
    const { teacherData } = this.props;
    console.log("teacher data: ", teacherData);
    if (teacherData) {
      const secList = teacherData.secList;
      return (
        <div>
          <h4>Subject Name : {teacherData.subjectName}</h4>
          <h4>Subject ID : {teacherData.subjectId}</h4>
          <br />
          {secList.map((sec, index) => (
            <div key={index} className="card mb-2">
              <div className="card-header">
                <strong>Section : {index}</strong>
              </div>
              <div className="card-body">
                {sec.subjectTimeMap.split("_").map((num, index) => {
                  return (
                    <div key={index}>Date : {mapToDateTime[num].date}, Time : {mapToDateTime[num].time}  </div>
                  );
                })}
                <div>
                  Student : {sec.currentStudent}/{sec.capacity}
                </div>
                <br />
                <div className="mb-1">Student List</div>
                <StudentList students={sec.studentList} />
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h4>Loading Teacher</h4>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    teacherData: state.register.teacherData
  };
};

export default connect(
  mapStateToProps,
  { logoutTeacher, fetchTeacher }
)(TeacherBoard);
