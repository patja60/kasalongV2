import React, { Component } from "react";
import { mapToDateTime } from "../DateTime";

import RegisteredCard from "./RegisteredCard";

class RegisteredSubjects extends Component {
  constructor(props) {
    super(props);

    this.generateRegisteredData = this.generateRegisteredData.bind(this);
  }

  componentDidMount() {
    // this.getRegisteredSubject();
  }

  // this method returns a list of subjects that this student has registered, which contains subjects information
  generateRegisteredData(userData, subjectData) {
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
          <div className="h4">Registered Subject</div>
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
