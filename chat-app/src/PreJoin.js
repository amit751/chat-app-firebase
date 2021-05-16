import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";

export default function PreJoin() {
  let location = useLocation();
  let history = useHistory();
  console.log(location, "LOC");
  useEffect(() => {
    console.log("inside");
    const query = location.search.slice(1, 5);
    if (query === "room") {
      const joinRoom = location.search.slice(6);
      if (joinRoom) {
        // history.push("/prejoin");
      }

      // roomsref.where("room" , "=" , joinRoom).
    }
  }, [location.search]);

  return (
    <div>
      <p>fffffffffffffffff</p>prejoin
    </div>
  );
}
