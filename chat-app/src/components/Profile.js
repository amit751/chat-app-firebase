import firebase from "firebase";

import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ActiveChat from "./ActiveChat.js";
import RoomDisplay from "./RoomDisplay.js";
import "../style/profile.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
export default function Profile({ user }) {
  useEffect(() => {
    if (user.displayName && user.photoURL) {
      setProfileDetails(true);
      setImgUrl(user.photoURL);
    }
    roomsref
      .where("users", "array-contains", user.uid)
      .get()
      .then((querySnapshot) => {
        const newUserRooms = [];
        querySnapshot.forEach((doc) => {
          const room = doc.data();
          newUserRooms.push({
            password: room.password,
            link: room.link,
            room: room.room,
          });
        });

        setUserRooms(newUserRooms);
      });
  }, []); ///user
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
  const [userRooms1] = useCollectionData(
    roomsref.where("users", "array-contains", user.uid)
  );

  const openChat = (room) => {
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
        link: baseUrl + "/rooms?room=" + newRoom.id,
      })
      .then(() => {
        console.log("added");

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
  };

  return (
    <div className="profile-component">
      <div className="profile-component-warper">
        <div className="head">
          <div id="user">
            <div className="user-stamp">
              <span id="stamp-box">
                <img src={imgUrl} className="profile-img" />
                <p> {user.displayName} </p>
              </span>
            </div>
            <div className="signout">
              <button onClick={singOut}>singout</button>
            </div>
          </div>
          <div className="set-profile-details">
            <h2> profile settings</h2>
            <div>
              image:
              <input type="file" ref={uploadedFile} required></input>
            </div>

            <div>
              username:
              <input required ref={nickname}></input>
            </div>
            <button type="submit" onClick={setUserDetails}>
              submit
            </button>
            <div> {popMessage}</div>
          </div>
        </div>

        <div id="create-room">
          <div>
            <button onClick={createRoom}>create chat room</button>
          </div>
        </div>

        <div id="user-rooms">
          {userRooms1?.map((room, i) => (
            <RoomDisplay room={room} openChat={openChat} i={i} key={i} />
          ))}
        </div>
      </div>
      <div id="active-chat">
        {activeChat ? (
          <ActiveChat
            activeChat={activeChat}
            user={user}
            setActiveChat={setActiveChat}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
// <div key={i}>
//   <h3>room{i}</h3>
//   <button
//     onClick={() => {
//       openChat(room.room);
//     }}
//   >
//     open
//   </button>
//   <p>
//     link:{room.link}, passcode:{room.password}
//   </p>
// </div>
