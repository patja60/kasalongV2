import React from "react";

export default ({ subject, onDelete }) => (
  <div className="card bg-light mb-2">
    <div className="card-body">
      <h6 className="card-title">
        {subject.subjectId}{" "}
        <span className="text-secondary">{subject.subjectName}</span>
        <button
          onClick={() => onDelete(subject.subjectId, subject.sec)}
          className="btn btn-danger float-right"
        >
          Remove
        </button>
      </h6>

      <div className="card-text">Section: {subject.sec}</div>
      <div className="card-text">Date: {subject.subjectDate}</div>
      <div className="card-text">Time: {subject.subjectTime}</div>
    </div>
  </div>
);
