import firebase from "firebase";
import { app } from "./App.js";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ActiveChat from "./ActiveChat.js";

export default function Profile({ user }) {
  const baseUrl = "http://localhost:3000";
  const [activeChat, setActiveChat] = useState(null);
  const [userRooms, setUserRooms] = useState([]);
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const roomsref = firestore.collection("rooms");
  const [imgUrl, setImgUrl] = useState();
  const openChat = (room) => {
    console.log(room);
    setActiveChat(room);
  };
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
  const createRoom = () => {
    const newRoom = roomsref.doc();
    newRoom
      .set({
        room: newRoom.id,
        users: [user.uid],
        password: uuidv4(),
        link: baseUrl + "/" + newRoom.id,
      })
      .then(() => {
        console.log("added");
        console.log(newRoom.link);

        newRoom.get().then((result) => {
          setUserRooms([
            ...userRooms,
            {
              password: result.data().password,
              link: result.data().link,
              room: result.data().room,
            },
          ]);
        });

        console.log(userRooms);
      })
      .catch((e) => console.log(e));
  };
  const upload = () => {
    const storageRef = storage.ref("users-profile/" + user.uid);
    const uploadTask = storageRef.put(uploadedFile.current.files[0]);
    uploadTask.on("state_changed", () => {
      storage
        .ref("users-profile/" + user.uid)
        .getDownloadURL()
        .then((url) => {
          setImgUrl(url);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
  return (
    <div>
      <img src={imgUrl} />
      <p>hi user logged in</p>
      <button onClick={singOut}>singout</button>
      <div className="profile-details">
        <p>CHOOSE image profile</p>
        <input type="file" ref={uploadedFile}></input>
        <button onClick={upload}>submit</button>
      </div>
      <div id="create-room">
        <button onClick={createRoom}>create chat room</button>
      </div>
      <div id="user-rooms">
        {userRooms.map((room, i) => {
          return (
            <div key={i}>
              <h3>room{i}</h3>
              <button
                onClick={() => {
                  openChat(room.room);
                }}
              >
                open
              </button>
              <p>
                link:{room.link}, passcode:{room.password}
              </p>
            </div>
          );
        })}
      </div>
      <div id="active-chat">
        {activeChat ? (
          <ActiveChat activeChat={activeChat} user={user} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
