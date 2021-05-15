import React, { useRef } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";

export default function ActiveChat({ activeChat, user }) {
  const inputText = useRef();
  const firestore = firebase.firestore();
  const messagesref = firestore.collection("messages");

  const [messages] = useCollectionData(
    messagesref.orderBy("createdAt").limit(3)
    //.where("room", "==", activeChat)
  );
  const sendMessage = () => {
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
    console.log(messages);
  };
  return (
    <div>
      <h1>{activeChat}</h1>
      <div id="messages-box">
        {messages?.map((message, i) => {
          console.log(message);
          return <Message key={i} message={message} />;
        })}
      </div>
      <label>
        write your message
        <textarea ref={inputText}></textarea>
        <button onClick={sendMessage}>send</button>
      </label>
    </div>
  );
}
