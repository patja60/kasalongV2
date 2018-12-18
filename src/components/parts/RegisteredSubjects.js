import React, { Component } from "react";
import { convertDecToBin } from "../DateTime";

import RegisteredCard from "./RegisteredCard";

import { dummy1 } from "./dummyForTableAndList";

class RegisteredSubjects extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.getRegisteredSubject();
  }

  // this method returns a list of subjects that this student has registered, which contains subjects information
  getRegisteredSubject = () => {
    console.log("getting...");
    const { userData } = this.props;
    const charStr = convertDecToBin(userData.registeredSubject);
    console.log("convert successful charStr = " + charStr);
    const regList = [];
    for (let i = charStr.length - 1; i >= 0; i--) {
      if (charStr.charAt(i) === "1") console.log(`charAt(${i}) == 1`);
    }
  };

  render() {
    if (dummy1)
      return (
        <div>
          <div className="h4">Registered Subject</div>
          {dummy1.map((subject, index) => (
            <RegisteredCard key={index} subject={subject} />
          ))}
        </div>
      );
  }
}

export default RegisteredSubjects;
