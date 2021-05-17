import React, { useRef } from "react";
import firebase from "firebase";

export default function SignUp() {
  const userEmail = useRef();
  const userPassword = useRef();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleSingup = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        console.log("sing with google sucses", result);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const facebookSingup = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        console.log("sing with facebook sucses", result);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const submit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        userEmail.current.value,
        userPassword.current.value
      )
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div>
      <h1>sign up</h1>
      <label>
        Email
        <input ref={userEmail} type="email" required></input>
      </label>
      <label>
        Password
        <input ref={userPassword} type="text" required></input>
      </label>
      <button onClick={submit}>submit</button>
      sign up with google
      <button onClick={googleSingup}>google</button>
      sign up with facebook
      <button onClick={facebookSingup}>facebook</button>
    </div>
  );
}
// user
//   .updateProfile({
//     photoURL: "https://example.com/jane-q-user/profile.jpg",
//   })
//   .then(function () {
//     // Update successful.
//   })
//   .catch(function (error) {
//     // An error happened.
//   });
