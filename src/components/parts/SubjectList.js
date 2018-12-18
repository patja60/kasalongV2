import React from "react";

export default ({ subjects, onSubjectClick }) => (
  <div className="dropdown mb-3">
    <button
      className="btn btn-info dropdown-toggle"
      type="button"
      data-toggle="dropdown"
    >
      Choose a subject
    </button>

    <div className="dropdown-menu">
      {subjects.map((subject, index) => (
        <div
          style={{ cursor: "pointer" }}
          key={subject.subjectId}
          className="dropdown-item"
          onClick={() => {
            console.log("subjectId passed: ", subject.subjectId);
            onSubjectClick(index);
          }}
        >
          {subject.subjectId}: {subject.subjectName}
        </div>
      ))}
    </div>
  </div>
);
