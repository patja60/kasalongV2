import React from "react";

export default ({ subject, onDelete }) => (
  <div className="card bg-light mb-2">
    <div className="card-body">
      <h6 className={parseInt(subject.subjectId.substring(5,7))<=30?
        "card-title text-info"
        : "card-title text-success"}>
        <span className={parseInt(subject.subjectId.substring(5,7))<=30?
          "text-info"
          : "text-success"}>◉</span>
        {" "}{subject.subjectId.substring(2,7)}{" "}
        <span className="text-secondary">{subject.subjectName}</span>
        <button
          onClick={() => onDelete(subject.subjectId, subject.sec)}
          className="btn btn-danger float-right"
        >
          Remove
        </button>
      </h6>

      <div className="card-text">
        <strong>Section: {subject.sec}</strong>
      </div>
      <div>
      <strong>Room: {subject.room}</strong>
      </div>
      <div className="card-text">
        <div>Time:</div>
        <div>
          {subject.subjectDate[0]} : {subject.subjectTime[0]}
        </div>
        <div>
          {subject.subjectDate.length > 1 &&
            subject.subjectDate[1] + " : " + subject.subjectTime[1]}
        </div>
      </div>
      <div className="card-text" />
    </div>
  </div>
);
