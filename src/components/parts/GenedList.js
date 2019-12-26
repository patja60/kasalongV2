import React from "react";

export default ({ subjects, onSubjectClick }) => {
  return (
    <div className="dropdown mb-3">
      <button
        className="btn btn-block btn-success dropdown-toggle"
        type="button"
        data-toggle="dropdown"
      >
        Choose a gened
      </button>

      <div className="dropdown-menu">
        {subjects.map((subject, index) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              key={subject.subjectId}
              className="dropdown-item"
              onClick={() => {
                console.log("subjectId passed: ", subject.subjectId);
                onSubjectClick(index + 9);
              }}
            >
              {subject.subjectId.substring(2,7)}: {subject.subjectName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
