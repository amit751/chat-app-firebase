import React, { useRef, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import firebase from "firebase";
import ActiveChat from "./ActiveChat";
import { useAuthState } from "react-firebase-hooks/auth";
export default function PreJoin() {
  const auth = firebase.auth();

  const [user] = useAuthState(auth);
  const firestore = firebase.firestore();
  const roomsref = firestore.collection("rooms");
  let location = useLocation();
  let history = useHistory();
  const [Room, setRoom] = useState();
  const [authorized, setAuthorized] = useState(false);
  const [popMessage, setPopMessage] = useState();
  const roomPassword = useRef();

  useEffect(() => {
    console.log("inside");
    const query = location.search.slice(1, 5);
    const joinRoom = location.search.slice(6);
    if (!(query === "room") || !joinRoom) history.push("/");
    roomsref
      .where("room", "==", joinRoom)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.empty);
        if (querySnapshot.empty) {
          alert("there is no such room");
          history.push("/");
        }

        querySnapshot.forEach((doc) => {
          console.log("hereee");
          const room = doc.data();
          console.log(room);
          setRoom(room);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [location.search]);

  const JOINRoom = () => {
    if (roomPassword.current.value !== Room.password) {
      roomPassword.current.value = "";
      return setPopMessage("incorect password");
    }
    ///ad user to room.users
    const wantedRoomRef = roomsref.doc(Room.room);
    wantedRoomRef
      .update({ users: firebase.firestore.FieldValue.arrayUnion(user.uid) })
      .then((result) => {
        console.log(result, "updated succesfuly");
      })
      .catch((e) => console.log(e));
    setAuthorized(true);
  };

  return (
    <div>
      <div>
        <button>back to profile</button>
      </div>
      {authorized ? (
        <div id="active-chat">
          <ActiveChat activeChat={Room.room} user={user} />
        </div>
      ) : (
        <div>
          <p>please enter passcode</p>
          <input ref={roomPassword} required></input>
          <button onClick={JOINRoom}>submit</button>
          {popMessage}
        </div>
      )}
    </div>
  );
}
