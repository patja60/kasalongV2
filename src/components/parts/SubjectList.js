import React, { Component } from "react";

export default ({ subjects, onSubjectClick }) => (
  <div className="dropdown mb-3">
    <button
      className="btn btn-primary dropdown-toggle"
      type="button"
      data-toggle="dropdown"
    >
      choose a subject
    </button>

    <div className="dropdown-menu">
      {subjects.map(subject => (
        <div
          style={{ cursor: "pointer" }}
          key={subject.subId}
          className="dropdown-item"
          onClick={() => {
            console.log("subjectId passed: ", subject.subId);
            onSubjectClick(subject.subId);
          }}
        >
          {subject.subId}: {subject.subName}
        </div>
      ))}
    </div>
  </div>
);
