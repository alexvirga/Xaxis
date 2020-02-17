import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



var firebaseConfig = {
    apiKey: "AIzaSyDR9cNqYmWD8i7UhmmJi67AmCZXvSpqLqI",
    authDomain: "fir-test-97599.firebaseapp.com",
    databaseURL: "https://fir-test-97599.firebaseio.com",
    projectId: "fir-test-97599",
    storageBucket: "fir-test-97599.appspot.com",
    messagingSenderId: "693878370615",
    appId: "1:693878370615:web:e20a343fafb6c8ee19eab2",
    measurementId: "G-2SDR1QRPS3"
  };

firebase.initializeApp(firebaseConfig)


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
