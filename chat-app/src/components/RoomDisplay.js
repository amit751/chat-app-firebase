import React, { useRef } from "react";

export default function RoomDisplay({ i, room, openChat }) {
  const linkRef = useRef();
  const passcodeRef = useRef();
  function copyLink(e) {
    linkRef.current.select();
    document.execCommand("copy");
  }
  function copyPasscode(e) {
    passcodeRef.current.select();
    document.execCommand("copy");
  }

  return (
    <div className="room-display">
      <h3>room{i}</h3>
      <button
        className="open-chat"
        onClick={() => {
          openChat(room.room);
        }}
      >
        open
      </button>
      <div>
        {" "}
        link:
        <input value={room.link} ref={linkRef} style={{ width: "3rem" }} />
        <button onClick={copyLink}>copy Link</button>
      </div>
      <div>
        passcode:
        <input
          value={room.password}
          ref={passcodeRef}
          style={{ width: "3rem" }}
        />
        <button onClick={copyPasscode}>copy passcode</button>
      </div>
    </div>
  );
}
