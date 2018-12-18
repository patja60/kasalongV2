import React, { Component } from "react";
import { convertDecToBin } from "../DateTime";

class RegisteredSubjects extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.getRegisteredSubject();
  }

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
    return (
      <div>
        Registered Subject
        <br />
        {JSON.stringify(this.props.userData)}
        <hr />
        {JSON.stringify(this.props.subjectData)}
        <button onClick={this.getRegisteredSubject} className="btn-default">
          Test
        </button>
      </div>
    );
  }
}

export default RegisteredSubjects;
