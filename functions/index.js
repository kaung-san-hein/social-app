const functions = require("firebase-functions");
const app = require("express")();

const admin = require("firebase-admin");
admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyCUMEKLjcdn8JGkKZEEoCI010QtzLWqB9Y",
  authDomain: "social-app-4ed33.firebaseapp.com",
  databaseURL: "https://social-app-4ed33.firebaseio.com",
  projectId: "social-app-4ed33",
  storageBucket: "social-app-4ed33.appspot.com",
  messagingSenderId: "306321905608",
  appId: "1:306321905608:web:b5b57833fd5be2c96712fd",
  measurementId: "G-FSQMYETWCF"
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          ...doc.data()
        });
      });
      return res.json(screams);
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  db.collection("screams")
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

//user registration
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  // TODO validate data

  let token, userId;
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already used" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.region("europe-west1").https.onRequest(app); // to change region
