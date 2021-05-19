import React, { useRef } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
import "../style/activechat.css";
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
    <div className="active-chat">
      <button
        onClick={() => {
          setActiveChat(false);
        }}
      >
        close
      </button>
      <h1>room</h1>
      <div id="messages-box">
        {messages
          ?.sort((a, b) => a.createdAt - b.createdAt)
          .map((message, i) => {
            const classname =
              message.userId === user.uid ? "current-user-message" : "";
            return (
              <div className={`message-container ${classname}`}>
                {" "}
                <Message
                  key={i}
                  message={message}
                  user={user}
                  className={classname}
                />
              </div>
            );
          })}
      </div>
      <div className="massege-input">
        <p>write your message</p>
        <textarea ref={inputText}></textarea>
        <button onClick={sendMessage}>send</button>
      </div>
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
