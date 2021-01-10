//importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import messageSchema from "./messageSchema.js";
import roomSchema from "./roomSchema.js";
import cors from "cors";

// app config
const app = express();
const port = process.env.port || 5000;

const pusher = new Pusher({
  appId: "1073864",
  key: "0c58f0f9bf4928bb2aec",
  secret: "23009551060eabfa7ea8",
  cluster: "ap2",
  encrypted: true,
});

//middleware
app.use(express.json());
app.use(cors());
//DB config
mongoose
  .connect(
    "mongodb+srv://admin:smqxmY4hEm19M8AH@cluster0.l4icg.mongodb.net/whatsappdb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(
    () => console.log("Database Conneted"),
    (err) => console.log(err)
  );

const db = mongoose.connection;

db.on("open", () => {
  console.log("db connected");

  const msgcollection = db.collection("messagecontents");
  const changeStream = msgcollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetaiils = change.fullDocument;
      pusher.trigger("message", "inserted", {
        name: messageDetaiils.name,
        message: messageDetaiils.message,
        timeStamp: messageDetaiils.timeStamp,
        received: messageDetaiils.received,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});
// ????

//Api route
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  messageSchema.find((err, data) => {
    if (err) {
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  messageSchema.create(dbMessage, (err, data) => {
    if (err) {
    } else {
      res.status(201).send(`new message created : \n${data}`);
    }
  });
});
app.post("/rooms/new", (req, res) => {
  const dbRoom = req.body;
  roomSchema.create(dbRoom, (err, data) => {
    if (err) {
    } else {
      res.status(201).send(`new room created : \n${data}`);
    }
  });
});
app.get("/rooms/:roomId", (req, res) => {
  if (!req.params.roomId) {
    res.status(403).send({ success: false, message: "No room id provided" });
  } else {
    roomSchema.findById(req.params.roomId, (err, data) => {
      if (err) {
        res.status(403).send("No data for the room");
      } else {
        res.status(201).send(data);
      }
    });
  }
});
app.get("/rooms", (req, res) => {
  roomSchema.find((err, data) => {
    if (err) {
    } else {
      res.status(200).send(data);
    }
  });
});
//listen
app.listen(port, () => {
  console.log("App is listening on " + port);
});
