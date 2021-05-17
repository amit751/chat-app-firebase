import React, { useRef } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";

export default function ActiveChat({ activeChat, user, setActiveChat }) {
  const inputText = useRef();
  const firestore = firebase.firestore();
  const messagesref = firestore.collection("messages");

  const [messages] = useCollectionData(
    messagesref
      .where("room", "==", activeChat)
      .orderBy("createdAt", "desc")
      .limit(6)
  );

  const sendMessage = () => {
    messagesref
      .add({
        content: inputText.current.value,
        userId: user.uid,
        userName: user.displayName,
        room: activeChat,
        createdAt: Date.now(),
        userImg: user.photoURL,
      })
      .then((result) => {
        result.get().then((test) => {
          // console.log(test.data(), test.data().createdAt);
        });
      });
    inputText.current.value = "";
    console.log(messages);
  };

  return (
    <div>
      <button
        onClick={() => {
          setActiveChat(false);
        }}
      >
        close
      </button>
      <h1>{activeChat}</h1>
      <div id="messages-box">
        {messages
          ?.sort((a, b) => a.createdAt - b.createdAt)
          .map((message, i) => {
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
// messagesref
//     .where("room", "==", activeChat)
//     .orderBy("createdAt", "desc")
//     .limit(25)
//     .get()
//     .then((result) => {
//       result.forEach((doc) => {
//         console.log("eee", doc.data());
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
