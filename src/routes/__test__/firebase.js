const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyC3bE6-O449w7-6OMVcwDKxfUyBSjO9pZU",
  authDomain: "prueba-c7523.firebaseapp.com",
  projectId: "prueba-c7523",
};

firebase.initializeApp(firebaseConfig);

module.exports.firebase = firebase;
