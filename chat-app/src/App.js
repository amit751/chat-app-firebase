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
        /////////////////////
        <Route exact path="/?">
          <ul class="firebaseui-idp-list">
            <li class="firebaseui-list-item">
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                // class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
                // data-provider-id="google.com"
                style="background-color:#ffffff"
                // data-upgraded=",MaterialButton"
              >
                <span class="firebaseui-idp-icon-wrapper">
                  <img
                    class="firebaseui-idp-icon"
                    alt=""
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  ></img>
                </span>
                <span class="firebaseui-idp-text firebaseui-idp-text-long">
                  Sign in with Google
                </span>
                <span class="firebaseui-idp-text firebaseui-idp-text-short">
                  Google
                </span>
              </button>
            </li>
            <li class="firebaseui-list-item">
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-facebook firebaseui-id-idp-button"
                data-provider-id="facebook.com"
                style="background-color:#3b5998"
                data-upgraded=",MaterialButton"
              >
                <span class="firebaseui-idp-icon-wrapper">
                  <img
                    class="firebaseui-idp-icon"
                    alt=""
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
                  ></img>
                </span>
                <span class="firebaseui-idp-text firebaseui-idp-text-long">
                  Sign in with Facebook
                </span>
                <span class="firebaseui-idp-text firebaseui-idp-text-short">
                  Facebook
                </span>
              </button>
            </li>
            <li class="firebaseui-list-item">
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                // class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button"
                // data-provider-id="password"
                style="background-color:#db4437"
                // data-upgraded=",MaterialButton"
              >
                <span>
                  <img
                    class="firebaseui-idp-icon"
                    alt=""
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"
                  ></img>
                </span>
                <span>Sign in with email</span>
                <span>Email</span>
              </button>
            </li>
          </ul>
        </Route>
      </Switch>
    </Router>
  );
}

// export  App;
