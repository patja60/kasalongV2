export default [
  {
    subjectId: 1,
    subjectName: "Exploring Engineering World",
    subjectPassword: "123456",
    sec: {
      1: { //There is always atlest 1 sec.
        secNumber: 1,
        subTime: 2,
        capacity: 40,
        current: 2,
        room: 1,
        studentList: {
          "userId": { name: "Patja", timeStamp: "..." },
          "userId": { name: "fudgy", timeStamp: "..." }
        }
      },
      2: {
        secNumber: 2,
        subTime: 5,
        capacity: 40,
        current: 0,
        room: 3,
        // this studentList node can be null if there is no student register yet, be careful.
      }
    }
  },
  {
    subId: 2,
    subName: "Express Bussiness",
    sec: {
      1: {
        secNumber: 1,
        subTime: 2,
        capacity: 40,
        current: 2,
        room: 2,
        studentList: {
          "userId": { name: "Patja", timeStamp: "..." },
          "userId": { name: "fudgy", timeStamp: "..." }
        }
      }
    }
  }
];
