import React, { Component } from "react";

export default ({ subId, subName, sections, currentSec, onSectionClick }) => (
  <div className="card mb-3 bg-light">
    <div className="card-body">
      <h6 className="card-title">
        {subId} {subName}
      </h6>
      <ul className="list-group">
        {sections.map((section, index) => (
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
                {section.current} / {section.capacity}
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

// col-sm version 1
{
  /* <h6>Section: {index + 1}</h6>
          <div className="row">
            <div className="col-sm-2">Period {index + 1}:</div>
            <div className="col float-sm-left">2 Jan: 9.00 - 10.30</div>
          </div> */
}

// simple version 1
{
  /* <div className="mb-2" key={index}>
          <h6 className="card-subtitle">Section: {index + 1}</h6>
          <div>Time: 2 Jan: 9.00 - 10.30</div>
        </div> */
}
