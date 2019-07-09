import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyAEFPZM8jdBgyF9B6OAC7p07WdvoUnCPd4",
  authDomain: "notes-d98f4.firebaseapp.com",
  databaseURL: "https://notes-d98f4.firebaseio.com",
  projectId: "notes-d98f4",
  storageBucket: "notes-d98f4.appspot.com",
  messagingSenderId: "740717618128",
  appId: "1:740717618128:web:4095523a3e249652"
});

ReactDOM.render(<App />, document.getElementById("root"));
