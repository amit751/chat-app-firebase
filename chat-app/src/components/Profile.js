import { app } from "../App.js";
import React, { useRef } from "react";
import firebase from "firebase";

const storage = firebase.storage(app);
export default function Profile({ user }) {
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
  const uploadedFile = useRef();
  return (
    <div>
      <p>hi user logged in</p>
      <button onClick={singOut}>singout</button>
      <div className="profile-details">
        <p>CHOOSE image profile</p>
        <input
          type="file"
          ref={uploadedFile}
          onChange={() => {
            console.log(uploadedFile.current);
            console.log(uploadedFile.current.files[0]);
          }}
        ></input>
      </div>
    </div>
  );
}
