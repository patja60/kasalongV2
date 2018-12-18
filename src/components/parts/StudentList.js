import React from "react";

export default ({ students }) => {
  if (students) {
    return (
      <div>
        {Object.values(students).map((student, index) => (
          <div key={index}>
            <h5>{student.username}</h5>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>hello</div>;
  }
};
