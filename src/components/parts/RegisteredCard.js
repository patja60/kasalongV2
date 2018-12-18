import React from "react";

export default ({ subject }) => (
  <div className="card bg-light mb-2">
    <div className="card-body">
      <h6 className="card-title">
        {subject.subjectId}{" "}
        <span className="text-secondary">{subject.subjectName}</span>
      </h6>
      <div className="row">
        <div className="col-sm-10">
          <div className="card-text">Section: {subject.sec}</div>
          <div className="card-text">Date: {subject.subjectDate}</div>
          <div className="card-text">Time: {subject.subjectTime}</div>
        </div>
        <div className="col-sm-2">
          <button className="btn btn-danger">Remove</button>
        </div>
      </div>
    </div>
  </div>
);
