export default [
  {
    subId: 1,
    subName: "Exploring Engineering World",
    subjectPassword: "123456",
    sec: {
      0: {
        //There is always atlest 1 sec.
        secNumber: 1,
        subTime: 2,
        subTimeMap: 2,
        capacity: 40,
        current: 2,
        room: 1,
        studentList: {
          userId: { name: "Patja", timeStamp: "..." },
          userId: { name: "fudgy", timeStamp: "..." }
        }
      },
      1: {
        secNumber: 2,
        subTime: 3,
        subTimeMap: "1_2",
        capacity: 40,
        current: 0,
        room: 3,
        studentList: null
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
        subTime: 5,
        subTimeMap: "1_4",
        capacity: 40,
        current: 2,
        room: 2,
        studentList: {
          userId: { name: "Patja", timeStamp: "..." },
          userId: { name: "fudgy", timeStamp: "..." }
        }
      }
    }
  }
];
