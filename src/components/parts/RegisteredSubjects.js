import React, { Component } from "react";
import { mapToDateTime } from "../DateTime";

import RegisteredCard from "./RegisteredCard";

class RegisteredSubjects extends Component {
  constructor(props) {
    super(props);

    this.generateRegisteredData = this.generateRegisteredData.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchSubject();
  //   this.props.fetchUserData();
  // }

  // this method returns a list of subjects that this student has registered, which contains subjects information
  generateRegisteredData(userData, subjectData) {
    if (!userData.secDict) {
      return [];
    }
    const secDict = userData.secDict;
    const registeredData = [];
    Object.keys(secDict).forEach(key => {
      const index = parseInt(key.substring(0, 2));
      const { subjectTimeMap } = subjectData[index].secList[secDict[key]];
      const array = subjectTimeMap.split("_");
      const tmp = [],
        dateArr = [],
        timeArr = [];
      for (let i = 0; i < array.length; i++) {
        tmp.push(Number(array[i]));
      }

      for (let i = 0; i < tmp.length; i++) {
        dateArr.push(mapToDateTime[tmp[i]].date);
        timeArr.push(mapToDateTime[tmp[i]].time);
      }

      let obj = {
        subjectId: key,
        subjectName: subjectData[index].subjectName,
        sec: secDict[key],
        subjectDate: dateArr,
        subjectTime: timeArr
      };
      registeredData.push(obj);
    });
    return registeredData;
  }

  render() {
    const { userData, subjectData } = this.props;
    const registeredSubjects = this.generateRegisteredData(
      userData,
      subjectData
    );
    if (userData && subjectData)
      return (
        <div>
          {registeredSubjects.length > 0 && (
            <div className="h4">Registered Subject</div>
          )}
          {registeredSubjects.map((subject, index) => (
            <RegisteredCard
              key={index}
              subject={subject}
              onDelete={this.props.onDelete}
            />
          ))}
        </div>
      );
  }
}

export default RegisteredSubjects;
