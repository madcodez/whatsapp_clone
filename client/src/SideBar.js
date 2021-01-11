import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./SideBar.css";
import SideBarChat from "./SideBarChat";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

function SideBar() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get("/rooms").then((response) => {
      setRooms(response.data);
    });
  }, []);
  //console.log(rooms);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="../assets/male-avatar-1.png" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or Strat a new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        {rooms.map((room, index) => (
          <SideBarChat key={index} room={room} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
