import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { fetchSubject, fetchUserData } from "../actions";
import { mapToDateTime } from "./DateTime";

import subTableImage from "../subTable.jpg";
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
      const index = parseInt(key.substring(3, 5)) - 1;
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
        subjectDate: mapToDateTime[subjectTime].date,
        subjectTime
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
      1024: null,
      2048: null
    };
    for (let i = 0; i < registeredData.length; i++) {
      let tmp = registeredData[i];
      obj2[registeredData[i].subjectTime] = `${tmp.subjectId}: ${
        tmp.subjectName
      }, Sec ${tmp.sec}`;
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
      1024: null,
      2048: null
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
      const obj = this.prepareDummy();
      return (
        <div className="mt-5">
          {/* <h4>Welcome : {userData.username}</h4> */}
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
                  <th scope="row">15 Jan 2019</th>
                  <td>{obj[1] || "-"}</td>
                  <td>{obj[2] || "-"}</td>
                  <td>{obj[4] || "-"}</td>
                  <td>{obj[8] || "-"}</td>
                </tr>
                <tr>
                  <th scope="row">16 Jan 2019</th>
                  <td>{obj[16] || "-"}</td>
                  <td>{obj[32] || "-"}</td>
                  <td>{obj[64] || "-"}</td>
                  <td>{obj[128] || "-"}</td>
                </tr>
                <tr>
                  <th scope="row">17 Jan 2019</th>
                  <td>{obj[256] || "-"}</td>
                  <td>{obj[512] || "-"}</td>
                  <td>{obj[1024] || "-"}</td>
                  <td>{obj[2048] || "-"}</td>
                </tr>
              </tbody>
            </table>
            <img src={subTableImage} />
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
