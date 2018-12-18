import React from "react";

export default ({ students }) => {
  if (students) {
    return (
      <div className="list-group">
        {Object.values(students).map((student, index) => (
          <ul key={index} className="list-group-item bg-light">
            {student.username}
          </ul>
        ))}
      </div>
    );
  } else {
    return <div>no student</div>;
  }
};
