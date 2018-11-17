import React, { Component } from "react";

export default ({ subId, subName, sections, currentSec }) => (
  <div className="card mb-3 border-primary">
    <div className="card-body">
      <h5 className="card-title">
        {subId} {subName}
      </h5>
      <ul className="list-group">
        {sections.map((section, index) => (
          <div>
            {currentSec == index ? (
              <li className="list-group-item active" key={index}>
                <div className="clearfix">
                  <h6 className="float-left">Section: {index + 1}</h6>
                  <span className="badge badge-primary float-right">
                    {section.current} / {section.capacity}
                  </span>
                </div>

                <div>Time: 2 Jan: 9.00 - 10.30</div>
              </li>
            ) : (
              <li className="list-group-item" key={index}>
                <div className="clearfix">
                  <h6 className="float-left">Section: {index + 1}</h6>
                  <span className="badge badge-primary float-right">
                    {section.current} / {section.capacity}
                  </span>
                </div>

                <div>Time: 2 Jan: 9.00 - 10.30</div>
              </li>
            )}
          </div>
        ))}
      </ul>
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
