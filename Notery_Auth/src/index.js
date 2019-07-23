import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBFadEUgCNnhM6FhiOEqfAZB-d4095Wu78",
  authDomain: "notesauth-9378a.firebaseapp.com",
  databaseURL: "https://notesauth-9378a.firebaseio.com",
  projectId: "notesauth-9378a",
  storageBucket: "notesauth-9378a.appspot.com",
  messagingSenderId: "950075865288",
  appId: "1:950075865288:web:3cd51a2ae233fc97"
});

ReactDOM.render(<App />, document.getElementById("root"))
   