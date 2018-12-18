import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { fetchSubject, fetchUserData } from "../actions";
import { mapToDateTime } from "./DateTime";

class Timetable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSubject();
    this.props.fetchUserData();
  }

  generateRegisteredData(userData, subjectData) {
    if(!userData.secDict){
      return [];
    }
    const secDict = userData.secDict;
    let registeredData = [];
    Object.keys(secDict).forEach((key) => {
      const index = parseInt(key.substring(3,5)) - 1;
      const subjectTime = subjectData[index].secList[secDict[key]].subjectTime;
      let obj = {
        subjectId: key,
        subjectName: subjectData[index].subjectName,
        sec: secDict[key],
        subjectDate: mapToDateTime[subjectTime].date,
        subjectTime: mapToDateTime[subjectTime].time
      }
      registeredData.push(obj);
    })
    return registeredData;
  }

  render() {
    const { userData, subjectData } = this.props;
    if(userData && subjectData){
      const registeredData = this.generateRegisteredData(userData, subjectData);
      console.log(registeredData)
      return (
        <div className="mt-5">
          <div>
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

          <div>
            <div className="h5 mb-2">This is your time table</div>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">9.00 - 10.30</th>
                  <td>John</td>
                  <td>Will</td>
                  <td>Shannon</td>
                </tr>
                <tr>
                  <th scope="row">10.30 - 12.00</th>
                  <td>Doe</td>
                  <td>Johnson</td>
                  <td>Williams</td>
                </tr>
                <tr>
                  <th scope="row">13.00 - 14.30</th>
                  <td>jdoe@gmail.com</td>
                  <td>will@yahoo.com</td>
                  <td>shannon@yahoo.com</td>
                </tr>
                <tr>
                  <th scope="row">14.30 - 16.00</th>
                  <td>jdoe@gmail.com</td>
                  <td>will@yahoo.com</td>
                  <td>shannon@yahoo.com</td>
                </tr>
              </tbody>
            </table>
          </div>
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
