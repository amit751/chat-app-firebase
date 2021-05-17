import React from "react";

export default function RoomDisplay({ i, room, openChat }) {
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
      <div> link:{room.link}</div>
      <div>passcode:{room.password}</div>
    </div>
  );
}
