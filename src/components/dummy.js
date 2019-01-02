export default [
  {
    subId: 1,
    subName: "Exploring Engineering World",
    subjectPassword: "123456",
    sec: {
      0: {
        //There is always atlest 1 sec.
        sec: 1,
        subjectTime: 2,
        subjectTimeMap: 2,
        capacity: 40,
        currentStudent: 2,
        studentList: {
          userId: { name: "Patja", timeStamp: "..." },
          userId: { name: "fudgy", timeStamp: "..." }
        }
      },
      1: {
        sec: 2,
        subjectTime: 3,
        subjectTimeMap: "1_2",
        capacity: 40,
        currentStudent: 0,
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
        sec: 1,
        subjectTime: 5,
        subjectTimeMap: "1_4",
        capacity: 40,
        currentStudent: 2,
        studentList: {
          userId: { name: "Patja", timeStamp: "..." },
          userId: { name: "fudgy", timeStamp: "..." }
        }
      }
    }
  }
];
