import React, { useRef } from "react";
import firebase from "firebase";
export default function ActiveChat({ activeChat, user }) {
  const inputText = useRef();
  const firestore = firebase.firestore();
  const messagesref = firestore.collection("messages");
  const sendMessage = () => {
    console.log(inputText.current.value);
    messagesref
      .add({
        content: inputText.current.value,
        userId: user.uid,
        userName: user.displayName,
        room: activeChat,
        createdAt: new Date(),
      })
      .then((result) => {
        result.get().then((test) => {
          console.log(test.data(), test.data().createdAt);
        });
      });
    inputText.current.value = "";
  };
  return (
    <div>
      <h1>{activeChat}</h1>
      <div id="messages-box"></div>
      <label>
        write your message
        <textarea ref={inputText}></textarea>
        <button onClick={sendMessage}>send</button>
      </label>
    </div>
  );
}
