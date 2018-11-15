import React, { Component } from "react";

export default ({ subName, content }) => (
  <div className="card mb-3 bg-dark">
    <div className="card-body text-white">
      <h5 className="card-title">{subName}</h5>
      {content.map((c, index) => (
        <div key={index}>{c}</div>
      ))}
      {/* <div>{content[0]}</div>
      <div>{content.length > 1 && content[1]}</div> */}
    </div>
  </div>
);
