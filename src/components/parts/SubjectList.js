import React, { Component } from "react";

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
          key={subject.subId}
          className="dropdown-item"
          onClick={() => {
            console.log("subjectId passed: ", subject.subId);
            onSubjectClick(index);
          }}
        >
          {subject.subId}: {subject.subName}
        </div>
      ))}
    </div>
  </div>
);
