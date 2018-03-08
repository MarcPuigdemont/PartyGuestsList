import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA1yRns7s6j6j3iPhAJ0Q1azMUkH-4xH08',
  authDomain: 'the-list-c585c.firebaseapp.com',
  databaseURL: 'https://the-list-c585c.firebaseio.com',
  projectId: 'the-list-c585c',
  storageBucket: 'the-list-c585c.appspot.com',
  messagingSenderId: '651645743115'
};

const initializeFirebase = () => {
  const fbApp = firebase.initializeApp(firebaseConfig);
  console.log(fbApp);
  return fbApp;
};

const authenticate = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().languageCode = 'es';
  provider.setCustomParameters({
    login_hint: 'user@example.com'
  });

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
      // ...
    });
};

export { initializeFirebase, authenticate };
