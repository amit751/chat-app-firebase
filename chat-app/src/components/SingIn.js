import React, { useRef } from "react";
import firebase from "firebase";

export default function SingIn() {
  const userEmail = useRef();
  const userPassword = useRef();

  const submit = () => {
    console.log(userEmail.current.value);
    console.log(userPassword.current.value);
    firebase
      .auth()
      .signInWithEmailAndPassword(
        userEmail.current.value,
        userPassword.current.value
      )
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <div>
      <h1>sign in</h1>
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
