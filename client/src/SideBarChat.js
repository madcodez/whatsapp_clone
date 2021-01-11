import React from "react";
import { Link } from "react-router-dom";
import "./SideBarChat.css";
import { Avatar, IconButton } from "@material-ui/core";

function SideBarChat({ room }) {
  return (
    <Link to={`/room/${room._id}`}>
      <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h2>{room.name}</h2>
          <p>This the last Message</p>
        </div>
      </div>
    </Link>
  );
}

export default SideBarChat;
