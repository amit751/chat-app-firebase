import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import SignUp from "./components/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import SingIn from "./components/SingIn";

const firebaseConfig = {
  apiKey: "AIzaSyBZWJOUebJkP9wUuaaP2172OMfQwo8_GcI",
  authDomain: "chat-app-899d0.firebaseapp.com",
  projectId: "chat-app-899d0",
  storageBucket: "chat-app-899d0.appspot.com",
  messagingSenderId: "369047874040",
  appId: "1:369047874040:web:e244741d0e304b86430e0d",
  measurementId: "G-8329MG3CSB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  const singOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(user);
  return (
    <div>
      {user ? (
        <>
          <p>hi user logged in</p>
          <button onClick={singOut}>singout</button>
        </>
      ) : (
        <>
          <SignUp />
          <SingIn />
        </>
      )}
    </div>
  );
}

export default App;
