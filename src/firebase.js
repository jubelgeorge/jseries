import firebase from "firebase/app";
import "firebase/auth";

// firebase config
const config = {
    apiKey: "AIzaSyCD4K8GSsWELb8_7j9Voku2twoBTdTPJmA",
    authDomain: "jseries-a2904.firebaseapp.com",
    projectId: "jseries-a2904",
    storageBucket: "jseries-a2904.appspot.com",
    messagingSenderId: "233878657179",
    appId: "1:233878657179:web:4dcab27ff06ec825420e3e"
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();