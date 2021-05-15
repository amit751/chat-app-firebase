import React, { useRef } from "react";
import firebase from "firebase";

export default function SignUp() {
  const userEmail = useRef();
  const userPassword = useRef();

  const submit = () => {
    console.log(userEmail.current.value);
    console.log(userPassword.current.value);
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        userEmail.current.value,
        userPassword.current.value
      )
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        const user = userCredential.user;
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

      <button on onClick={submit}>
        submit
      </button>
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
