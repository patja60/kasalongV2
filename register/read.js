var XLSX = require('xlsx');
var excel = require('exceljs');
var workbook = XLSX.readFile('student.xlsx');
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
    console.log(data);

    var reColumns=[
        {header:'Year',key:'year'},
        {header:'Room',key:'room'},
        {header:'Name',key:'name'},
        {header:'Nickname',key:'nickname'},
        {header:'Bdate',key:'bdate'},
        {header:'Password',key:'passwd'},
    ];
    st.columns = reColumns;

    // data.forEach((item, index) => {
    //   //console.log(i, item)
    //   index++;
    //   var valueArray = [];
    //   valueArray = Object.values(item); // forming an array of values of single json in an array
    //   let genData
    //   if(isNaN(valueArray[1]) ){
    //     valueArray[1] = 0;
    //   }
    //   if(isNaN(valueArray[2]) ){
    //     valueArray[2] = 0;
    //   }
    //   if(index < 10){
    //     genData = "" + valueArray[1] + valueArray[2] + "0" + index
    //   }else{
    //     genData = "" + valueArray[1] + valueArray[2] + index
    //   }
    //
    //   password = valueArray[8].toString();
    //   for(let i = 6 - password.length ; i > 0 ; i--){
    //     password = password + i.toString();
    //   }
    //
    //   valueUse = [valueArray[1], valueArray[2], valueArray[3], valueArray[4], password,genData]
    //   //addUserToFirebase(index, genData+"@camp.com", valueArray[3], valueArray[8])
    //   st.addRow(valueUse); // add the array as a row in sheet
    // });
    //
    // wb.xlsx.writeFile('./out.xlsx').then(function() {
    //     console.log('file is written');
    // });
});

function addUserToFirebase(index, email, username, password) {
  console.log(index, email, username, password);
  const splitName = username.split(" ")
  const newName = splitName.join(" ")
  password = password.toString();
  for(let i = 6 - password.length ; i > 0 ; i--){
    password = password + i.toString();
  }
  //console.log(password)
  if(true){
    firebase.auth().createUserWithEmailAndPassword( email, password )
    .then((userData) => {
      const defaultData = {
        username: newName,
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
