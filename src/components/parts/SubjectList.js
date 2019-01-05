import React from "react";

export default ({ subjects, onSubjectClick }) => {
  return (
    <div className="dropdown mb-3">
      <button
        className="btn btn-info dropdown-toggle"
        type="button"
        data-toggle="dropdown"
      >
        Choose a subject
      </button>

      <div className="dropdown-menu">
        {subjects.map((subject, index) => {
          return (
            <div
              style={{ cursor: "pointer", fontSize: "0.8em" }}
              key={subject.subjectId}
              className="dropdown-item"
              onClick={() => {
                console.log("subjectId passed: ", subject.subjectId);
                onSubjectClick(index);
              }}
            >
              {subject.subjectId}: {subject.subjectName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
