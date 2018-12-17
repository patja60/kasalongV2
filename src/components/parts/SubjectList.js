import React, { Component } from "react";

export default ({ subjects, onSubjectClick }) => {
  console.log("this is subject list")
  console.log(subjects)
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
          console.log(subject, index);
          return (
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
          )
        })}
      </div>
    </div>
  );
}
