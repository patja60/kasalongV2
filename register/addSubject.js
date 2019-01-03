const firebase = require('firebase')
const firebaseConfig = {
  apiKey: "AIzaSyC17_L0LsfxLgSrSkkQuDZmETgk5MoMKps",
  authDomain: "kasalongv2.firebaseapp.com",
  databaseURL: "https://kasalongv2.firebaseio.com",
  projectId: "kasalongv2",
  storageBucket: "kasalongv2.appspot.com",
  messagingSenderId: "1041888717910"
};

firebase.initializeApp(firebaseConfig);

var subjects = require('./subject');

for (let i = 0; i < subjects.length; i++) {
  const subjectId = subjects[i].subId;
  const subjectName = subjects[i].subjectName;
  const subjectPassword = subjects[i].subjectPassword;
  const secList = subjects[i].secList;

  // console.log(i, subjectId, subjectName, subjectPassword, secList);
  addSubjectToFirebase(i, subjectId, subjectName, subjectPassword, secList);
}

function addSubjectToFirebase(index, subjectId, subjectName, subjectPassword, secList) {
  console.log(index, subjectId, subjectName, subjectPassword, secList);
  // Object.keys(secList).forEach((key) => {
  //   console.log(secList[key].subjectTime, secList[key].subjectTimeMap, secList[key].capacity)
  // });

  firebase.database().ref(`/subject`)
  .child(subjectId).set({ subjectName: subjectName, subjectId: subjectId, subjectPassword: subjectPassword })
  .then(() => {
    Object.keys(secList).forEach((key) => {
      firebase.database().ref(`/subject/${subjectId}/secList/${key}`)
      .set({ subjectTime: secList[key].subjectTime, subjectTimeMap: secList[key].subjectTimeMap, capacity: secList[key].capacity, currentStudent: 0 })
      .then(() => {
        const email = subjectId+"@camp.com";
        const password = subjectPassword;
        firebase.auth().createUserWithEmailAndPassword( email, password )
      })
      .catch((err) => {
        console.log("*****some err here***** :" + index + ": " + err)
      });
    });
  })
  .catch(() => {
    console.log("*****some err here***** :" + index + ": " + err)
  });
}
