import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./Chat.css";
import axios from "./axios";
import Pusher from "pusher-js";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
    if (roomId) {
      axios.get(`/rooms/${roomId}`).then((response) => {
        setRoomName(response.data.name);
      });
    }
  }, [roomId]);
  useEffect(() => {
    var pusher = new Pusher("0c58f0f9bf4928bb2aec", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("message");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at..</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat__message ${message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timeStamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input placeholder="Type a message" type="text" />
          <button type="submit">Send</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
export default Chat;
