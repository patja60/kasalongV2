import React, { Component } from "react";

export default ({ students }) => {
  if(students) {
    return (
      <div>
        { Object.values(students).map((student,index) => {
          console.log(student.username)
            return (
              <div>
                <h5>
                  {student.username}
                </h5>
              </div>
            )
          })}
      </div>
    );
  }else{
    return(
      <div>
        hello
      </div>
    );
  }
}
