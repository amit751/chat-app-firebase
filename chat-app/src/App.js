import firebase from "firebase";
import "./App.css";
import SignUp from "./SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import SingIn from "./SingIn";
import Profile from "./Profile";
import ReactDOM from "react-dom";
import PreJoin from "./PreJoin";
import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  Route,
} from "react-router-dom";
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

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            {user ? (
              <Profile user={user} />
            ) : (
              <>
                <SignUp />
                <SingIn />
              </>
            )}
          </div>
        </Route>
        <Route exact path="/rooms">
          <div>
            {user ? (
              <PreJoin user={user} />
            ) : (
              <>
                <h3>please singin/up first</h3>
                <SignUp />
                <SingIn />
              </>
            )}
          </div>
        </Route>
        {/* <Route path="/prejoin">
          <PreJoin />
        </Route> */}
      </Switch>
    </Router>
  );
}

// export  App;
