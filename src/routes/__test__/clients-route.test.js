const firebase = require("firebase");
const config = require("../../config");

describe("endpoints defined in clients-route, method:GET", () => {
  const email = config.firebase.mail;
  const password = config.firebase.user_password;
  const firebaseConfig = {
    apiKey: config.firebase.api_key,
    authDomain: "real-estate-agency-client-api.firebaseapp.com",
    projectId: "real-estate-agency-client-api",
    storageBucket: "real-estate-agency-client-api.appspot.com",
    messagingSenderId: "225351397540",
    appId: config.firebase.appId,
    measurementId: "G-9ZSHE9N0EV",
  };

  firebase.initializeApp(firebaseConfig);

  test("sign up", async () => {
    var signed = false;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        signed = true;
      })
      .catch((error) => {
        console.log(error);
        signed = false;
      });

    expect(signed).toBeTruthy();
  });
});
