import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
      apiKey: "AIzaSyAnEYjsNeQmF7l-8mwaicp2ZMa4XLxdnRE",
      authDomain: "todoist-drew.firebaseapp.com",
      databaseURL: "https://todoist-drew.firebaseio.com",
      projectId: "todoist-drew",
      storageBucket: "todoist-drew.appspot.com",
      messagingSenderId: "595763662839",
      appId: "1:595763662839:web:9706c0a200a783f46b28f2",
});

export {firebaseConfig as firebase};
