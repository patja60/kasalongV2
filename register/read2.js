
var XLSX = require('xlsx');
var excel = require('exceljs');
var workbook = XLSX.readFile('studentData.xlsx');
var sheet_name_list = workbook.SheetNames;
var dataout = []

var wb = new excel.Workbook(); //creating workbook
var st = wb.addWorksheet('MySheet'); //creating worksheet

const firebase = require('firebase')
const firebaseConfig = require('../src/database')

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
        {header: 'Province',key: 'province'},
        {header:'Size',key:'size'},
        {header:'Username',key:'username'},
    ];
    st.columns = reColumns;
    school = [];
    // comment !!! to !!! for see data
    // !!!!!!!!!!!!!!!
    data.forEach((item, index) => {
      // console.log(i, item)
      var counter = 0
      var checkUser = []
      index++;
      var valueArray = [];
      valueArray = Object.values(item); // forming an array of values of single json in an array
      let genUsername
      if (index.toString().length < 2) {
        genUsername = makeUsername(3) + index + makeUsername(1)
      } else {
        genUsername = makeUsername(2) + index + makeUsername(1)
      }
      valueArray[7] = valueArray[7].replace("-", "")

      valueUse = [valueArray[1], valueArray[2], valueArray[3], valueArray[7], valueArray[5], valueArray[6], genUsername]

      //addUserToFirebase(index, genUsername+"@camp.com", valueArray[2], valueArray[7])
      /*
      st.addRow(valueUse); // add the array as a row in sheet
      */
    });
/*
    wb.xlsx.writeFile('./out.xlsx').then(function() {
        console.log('file is written');
    });*/
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
        registeredSubject: 0,
        email: email.substring(0,5)
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

function makeUsername(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }