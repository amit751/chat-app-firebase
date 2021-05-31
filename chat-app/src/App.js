import firebase from "firebase";

import SignUp from "./components/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import SingIn from "./components/SingIn";
import Profile from "./components/Profile";

import PreJoin from "./components/PreJoin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingInUi from "./components/SingInUi";
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
export const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            {user ? (
              <Profile user={user} />
            ) : (
              <>
                {/* <SignUp />
                <SingIn /> */}
                <SingInUi />
              </>
            )}
          </div>
        </Route>
        <Route exact path="/rooms">
          {console.log("ffffff")}
          <div>
            {user ? (
              <PreJoin user={user} />
            ) : (
              <>
                <h3>please singin/up first</h3>
                {/* <SignUp />
                <SingIn /> */}
                <SingInUi />
              </>
            )}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

// export  App;
