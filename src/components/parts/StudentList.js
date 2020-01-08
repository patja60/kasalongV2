import React from "react";

export default ({ students }) => {
  if (students) {
    var sortedList = []
    {Object.values(students).map((student) =>
      sortedList.push(student)
    )}
    sortedList.sort(function(a,b ) {
      return a.timeStamp - b.timeStamp
    })
    return (
      <div className="list-group">
        {Object.values(sortedList).map((student, index) => (
          <ul key={index} className="list-group-item bg-light">
            {index+1} : {student.username} : {secondsToHourMinuteSecond(student.timeStamp)}
          </ul>
        ))}
      </div>
    );
  } else {
    return (<div>
      <strong><font color = "ED1C24">No student</font></strong>
    </div>);
  }
};

function secondsToHourMinuteSecond(seconds){
  const timeChange = [3600, 60, 1]
  var text = ""
  for(let i = 0; i < 3; i++){
    var time = Math.floor(seconds / timeChange[i])
    if(time.toString().length == 1){
      time = "0" + time
    }
    seconds = seconds % timeChange[i]
    text = text + time + ":"
  }
return text.substring(0,text.length - 1)
}
