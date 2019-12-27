import React from "react";

export default ({ students }) => {
  if (students) {
    var sortedList = []
    {Object.values(students).map((student) =>
      sortedList.push(student)
    )}
    sortedList.sort(function(a,b ) {
      return a.timeStamp - b.timeStamp
    })
    return (
      <div className="list-group">
        {Object.values(sortedList).map((student, index) => (
          <ul key={index} className="list-group-item bg-light">
            {index+1} : {student.username}
          </ul>
        ))}
      </div>
    );
  } else {
    return <div>no student</div>;
  }
};
