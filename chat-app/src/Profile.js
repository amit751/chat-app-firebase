import firebase from "firebase";
import { app } from "./App.js";
import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ActiveChat from "./ActiveChat.js";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";

export default function Profile({ user }) {
  let location = useLocation();
  console.log(location);
  useEffect(() => {
    if (user.displayName && user.photoURL) {
      setProfileDetails(true);
      setImgUrl(user.photoURL);
    }
    roomsref
      .where("users", "array-contains", user.uid)
      .get()
      .then((querySnapshot) => {
        console.log("result", querySnapshot);
        const newUserRooms = [];
        querySnapshot.forEach((doc) => {
          const room = doc.data();
          newUserRooms.push({
            password: room.password,
            link: room.link,
            room: room.room,
          });
          console.log(room);
        });
        console.log(newUserRooms);
        setUserRooms(newUserRooms);
      });
  }, []);
  const baseUrl = "http://localhost:3000";
  const [activeChat, setActiveChat] = useState(null);
  const [userRooms, setUserRooms] = useState([]);
  const [popMessage, setPopMessage] = useState();
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const roomsref = firestore.collection("rooms");
  const uploadedFile = useRef();
  const [imgUrl, setImgUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbUSDcQ3hwL_QlSKnaQzPpijH3QoIft5f1kg&usqp=CAU"
  );
  const [profileDetails, setProfileDetails] = useState(false);
  const nickname = useRef();

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
  const setUserDetails = () => {
    if (!uploadedFile.current.files.length || !nickname.current.value) {
      setPopMessage("all fields requiered");
      return;
    }
    const storageRef = storage.ref("users-profile/" + user.uid);
    const uploadTask = storageRef.put(uploadedFile.current.files[0]);
    uploadTask.on("state_changed", () => {
      storage
        .ref("users-profile/" + user.uid)
        .getDownloadURL()
        .then((url) => {
          setImgUrl(url);
          const currentUser = firebase.auth().currentUser;

          currentUser
            .updateProfile({
              displayName: nickname.current.value,
              photoURL: url,
            })
            .then(function () {
              console.log("Update successful.");
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    });
    setProfileDetails(true);
    console.log("the user:", user);
  };

  return (
    <div>
      <img src={imgUrl} />
      <p>hi user logged in</p>
      <button onClick={singOut}>singout</button>
      <div className="profile-details">
        <label>
          <h2>set profile</h2>
          image:
          <input type="file" ref={uploadedFile} required></input>
          {/* <button onClick={upload}>submit</button> */}
          choose your nickname
          <input required ref={nickname}></input>
          <button type="submit" onClick={setUserDetails}>
            submit
          </button>
        </label>
        {popMessage}
      </div>

      {profileDetails ? (
        <>
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
// photoURL
// displayName
