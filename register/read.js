var XLSX = require('xlsx');
var excel = require('exceljs');
var workbook = XLSX.readFile('student2.xlsx');
var sheet_name_list = workbook.SheetNames;
var dataout = []

var wb = new excel.Workbook(); //creating workbook
var st = wb.addWorksheet('MySheet'); //creating worksheet

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

sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var tt = 0;
        for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        var col = z.substring(0,tt);
        var row = parseInt(z.substring(tt));
        var value = worksheet[z].v;

        //store header names
        if(row == 1 && value) {
            headers[col] = value;
            continue;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    // console.log(data);

    var reColumns=[
        {header:'Name',key:'name'},
        {header:'Nickname',key:'nickname'},
        {header:'Year',key:'year'},
        {header:'Passwd/Tel',key:'Tel'},
        {header:'Size',key:'size'},
        {header:'Username',key:'username'},
    ];
    st.columns = reColumns;
    school = [];

    data.forEach((item, index) => {
      //console.log(i, item)
      index++;
      var valueArray = [];
      valueArray = Object.values(item); // forming an array of values of single json in an array
      let genData
      if(isNaN(valueArray[5]) ){
        valueArray[5] = 1234567890;
      }
      if(valueArray[8].indexOf(" (") > 0){
        // console.log(valueArray[8].indexOf("("))
        // console.log(index, valueArray[8].substring(0,valueArray[8].indexOf("(")))
        valueArray[8] = valueArray[8].substring(0,valueArray[8].indexOf(" ("))
      }else if(valueArray[8].indexOf("(") > 0){
        // console.log(valueArray[8].indexOf("("))
        // console.log(index, valueArray[8].substring(0,valueArray[8].indexOf("(")))
        valueArray[8] = valueArray[8].substring(0,valueArray[8].indexOf("("))
      }
      if(index < 10){
        genData = "" + valueArray[8] + "0" + valueArray[4].substring(2,3) + "0" + index
      }else{
        genData = "" + valueArray[8] + "0" + valueArray[4].substring(2,3) + index
      }
      let sch;
      if(school.indexOf(valueArray[3]) < 0) {
        school.push(valueArray[3]);
        sch = school.length
      }else {
        sch = school.indexOf(valueArray[3]) + 1
      }

      valueUse = [valueArray[1], valueArray[2], valueArray[4], valueArray[5], valueArray[8], genData]
      addUserToFirebase(index, genData+"@camp.com", valueArray[1], valueArray[5])
      st.addRow(valueUse); // add the array as a row in sheet
    });

    wb.xlsx.writeFile('./out.xlsx').then(function() {
        console.log('file is written');
    });
});

function addUserToFirebase(index, email, username, password) {
  console.log(index, email, username, password);
  password = password.toString();
  if(true){
    firebase.auth().createUserWithEmailAndPassword( email, password )
    .then((userData) => {
      const defaultData = {
        username: username,
        password: password,
        studentTime: 0,
        registeredSubject: 0
      };
      firebase.database().ref(`/student/${userData.user.uid}/`).set(defaultData)
      .then(() => {
        console.log(index, " this user done")
      })
      .catch((err) => {
        console.log(err)
        console.log("not add data to db: ", index);
      });
    }).catch((err) => {
      console.log(err)
      console.log("this user not register: ", index);
    })
  }
}
