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
        {subId} {subName}
      </h6>
      <ul className="list-group">
        {Object.values(sections).map((section, index) => (
          <li
            className={
              currentSec == index
                ? "list-group-item bg-info text-white"
                : "list-group-item"
            }
            key={index}
            onClick={() => onSectionClick(index)}
            style={{ cursor: "pointer" }}
          >
            <div className="clearfix">
              <h6 className="float-left">Section: {index + 1}</h6>
              <span className="badge badge-info float-right">
                {section.currentStudent} / {section.capacity}
              </span>
            </div>

            <div>
              {/* Time: {mapToDateTime[section.subjectTime].date}:{" "}
              {mapToDateTime[section.subjectTime].time} */}
              Time:{" "}
              {section.subjectTimeMap.split("_").map((slot, slotNo) => (
                <div key={slotNo}>
                  {mapToDateTime[Number(slot)].date} :{" "}
                  {mapToDateTime[Number(slot)].time}
                </div>
                // <div key={slotNo}>{slot}</div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onRegister()}
        className="btn btn-outline-info btn-block mt-3"
      >
        Register
      </button>
    </div>
  </div>
);
