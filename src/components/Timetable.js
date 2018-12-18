import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { fetchSubject, fetchUserData } from "../actions";

class Timetable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSubject();
    this.props.fetchUserData();
    console.log("hi : " + JSON.stringify(this.props.userData));
    console.log("ho : " + JSON.stringify(this.props.subjectData));
  }

  generateSecDict(userData) {
    const secDict = userData.secDict;
    Object.keys(secDict).forEach((key) => {
        console.log(key);
    })
  }

  render() {
    const { userData } = this.props;
    if(userData){
      this.generateSecDict(userData)
      return (
        <div className="mt-5">
          <div className="h5 mb-2">This is your time table</div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th>9.00 - 10.30</th>
                <th>10.30 - 12.00</th>
                <th>13.00 - 14.30</th>
                <th>14.30 - 16.00</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>John</td>
                <td>Doe</td>
                <td>jdoe@gmail.com</td>
                <td>jdoe@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Will</td>
                <td>Johnson</td>
                <td>will@yahoo.com</td>
                <td>will@yahoo.com</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Shannon</td>
                <td>Williams</td>
                <td>shannon@yahoo.com</td>
                <td>shannon@yahoo.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }else{
      return (
        <div>
          <h4>Loading</h4>
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
    subjectData: state.register.subjectData,
    userData: state.register.userData
  };
};

export default connect(
  mapStateToProps,
  { fetchSubject, fetchUserData }
)(Timetable);
