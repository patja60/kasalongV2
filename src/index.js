import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAZtl7YLiztmI0OcFz9oezPhGsmkBk8NKM",
    authDomain: "reg-app-d5779.firebaseapp.com",
    databaseURL: "https://reg-app-d5779.firebaseio.com",
    projectId: "reg-app-d5779",
    storageBucket: "reg-app-d5779.appspot.com",
    messagingSenderId: "748243195360"
  };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
