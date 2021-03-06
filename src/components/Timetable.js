import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { fetchSubject, fetchUserData } from "../actions";
import { mapToDateTime } from "./DateTime";

import subTableImage from "../schedule.jpg";
import dummy from "./dummy";

class Timetable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSubject();
    this.props.fetchUserData();
  }

  generateRegisteredData(userData, subjectData) {
    if (!userData.secDict) {
      return [];
    }
    const secDict = userData.secDict;
    const registeredData = [];
    Object.keys(secDict).forEach(key => {
      const index = parseInt(key.substring(0, 2));
      const subjectTime = subjectData[index].secList[secDict[key]].subjectTime;
      console.log(
        `subjectData[${index}]=${
          subjectData[index].secList[secDict[key]].subjectTime
        }`
      );
      const obj = {
        subjectId: key,
        subjectName: subjectData[index].subjectName,
        sec: secDict[key],
        subjectTimeMap: subjectData[index].secList[secDict[key]].subjectTimeMap,
        room: subjectData[index].secList[secDict[key]].room
      };
      registeredData.push(obj);
    });
    const obj2 = {
      1: null,
      2: null,
      4: null,
      8: null,
      16: null,
      32: null,
      64: null,
      128: null,
      256: null,
      512: null,
    };
    let tmp, tmp1;
    for (let i = 0; i < registeredData.length; i++) {
      tmp = registeredData[i];
      tmp1 = registeredData[i].subjectTimeMap.split("_");
      console.log("tmp", tmp)
      console.log("tmp1: ", tmp1);
      for (let x = 0; x < tmp1.length; x++) {
        obj2[Number(tmp1[x])] = `${tmp.subjectId.substring(2,7)}: ${tmp.subjectName}, Sec ${
          tmp.sec}, Room : ${tmp.room}`;
        console.log(Number(tmp1[x]), obj2[Number(tmp1[x])]);
      }
    }
    return obj2;
  }

  // with dummy
  prepareDummy() {
    const obj = {
      1: null,
      2: null,
      4: null,
      8: null,
      16: null,
      32: null,
      64: null,
      128: null,
      256: null,
      512: null,
    };
    let tmp, tmp1;
    for (let i = 0; i < dummy.length; i++) {
      tmp = dummy[i];
      tmp1 = dummy[i].subjectTimeMap.split("_");
      console.log("tmp1: ", tmp1);
      for (let x = 0; x < 5; x++) {
        obj[Number(tmp1[x])] = `${tmp.subjectId}: ${tmp.subjectName}, Sec ${
          tmp.sec
        }`;
        console.log(Number(tmp1[x]), obj[Number(tmp1[x])]);
      }
    }
    return obj;
  }

  render() {
    const { userData, subjectData } = this.props;

    if (userData && subjectData) {
      const obj = this.generateRegisteredData(userData, subjectData);
      return (
        <div className="mt-5">
          {/* <h4>Welcome : {userData.username}</h4> */}
          <div>
            <div className="h5 mb-2">This is your time table</div>
            <table id="timeTable" className="table table-dark">
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
                  <th scope="row">13 Jan 2020</th>
                  <td>{obj[1] || "-"}</td>
                  <td>{obj[2] || "-"}</td>
                  <td>{"SPORT" || "-"}</td>
                  <td>{"ACTIVITY" || "-"}</td>
                </tr>
                <tr>
                  <th scope="row">14 Jan 2020</th>
                  <td>{obj[4] || "-"}</td>
                  <td>{obj[8] || "-"}</td>
                  <td>{obj[16] || "-"}</td>
                  <td>{obj[32] || "-"}</td>
                </tr>
                <tr>
                  <th scope="row">15 Jan 2020</th>
                  <td>{obj[64] || "-"}</td>
                  <td>{obj[128] || "-"}</td>
                  <td>{obj[256] || "-"}</td>
                  <td>{obj[512] || "-"}</td>
                </tr>
              </tbody>
            </table>
            <img style={{ width: "100%" }} src={subTableImage} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Loading...</h4>
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
