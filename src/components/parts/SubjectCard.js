import React from "react";
import { mapToDateTime } from "../DateTime";

export default ({
  subId,
  subName,
  sections,
  currentSec,
  onSectionClick,
  onRegister
}) => (
  <div className="card mb-3 bg-light">
    <div className="card-body">
      <h6 className="card-title">
        {subId.substring(2,7)} {subName}
      </h6>
      <ul className="list-group">
        {Object.values(sections).map((section, index) => (
          <li
            className={
              (currentSec == index) & (parseInt(subId.substring(5,7))<=30)
                ? "list-group-item bg-info text-white"
                : (currentSec == index)
                  ? "list-group-item bg-success text-white"
                  : "list-group-item"
            }
            key={index}
            onClick={() => onSectionClick(index)}
            style={{ cursor: "pointer" }}
          >
            <div className="clearfix">
              <h6 className="float-left">Section: {index + 1}</h6>
              <span className={(parseInt(subId.substring(5,7))<=30)?
                "badge badge-info float-right"
                :"badge badge-success float-right text-white"}>
                {section.currentStudent} / {section.capacity}
              </span>
            </div>
            <div>
              <strong>Room: {section.room}</strong>
            </div>
            <div>
              Time:{" "}
              {section.subjectTimeMap.split("_").map((slot, slotNo) => (
                <div key={slotNo}>
                  {mapToDateTime[Number(slot)].date} :{" "}
                  {mapToDateTime[Number(slot)].time}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onRegister()}
        className={(parseInt(subId.substring(5,7))<=30)?
          "btn btn-outline-info btn-block mt-3"
          :"btn btn-outline-success btn-block mt-3"}
      >
        Register
      </button>
    </div>
  </div>
);
