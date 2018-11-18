import React, { Component } from "react";

export default ({ subId, subName, sections, currentSec, onSectionClick }) => (
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

            <div>Time: 2 Jan: 9.00 - 10.30</div>
          </li>
        ))}
      </ul>
      <button className="btn btn-outline-info btn-block mt-3">Register</button>
    </div>
  </div>
);
