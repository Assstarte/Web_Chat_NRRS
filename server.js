//==================
//Crucial Imports
//==================

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

//==================
//MYSQL
//==================

const Sequelize = require("sequelize");
const sequelize = new Sequelize("test2", "root", "Inconcurent7&", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Message = sequelize.define("message", {
  nick: Sequelize.STRING,
  message: Sequelize.STRING
});

const Chat_rooms = sequelize.define("chat_rooms", {
  name: Sequelize.STRING
});

Chat_rooms.hasMany(Message);
Message.belongsTo(Chat_rooms);

//Chat_rooms.hasMany(Message, {as: ''})

sequelize.sync();

//===========================
//Controllers (REST Endpoints)
//===========================

//=========CREATE NEW CHAT ROOM=========

app.post("/message/room/:room_id?", async (req, res) => {
  console.log("Request Received");
  let { room_id } = req.params;
  if (!room_id) {
    let msg = await Message.create({
      nick: req.body.name,
      message: req.body.text,
      chatRoomId: req.body.chatRoomId
    });
    res.status(201);
    res.end(JSON.stringify(msg));
  } else {
    let msg = await Message.create({
      nick: req.body.name,
      message: req.body.text,
      chatRoomId: room_id
    });
    res.status(201);
    res.end(JSON.stringify(msg));
  }
});

//======================================

//===========POST MESSAGE===============

//(Default Chat Room since one is not specified)
app.post("/message", async (req, res) => {
  console.log("Request Received");

  let msg = await Message.create({
    nick: req.body.name,
    message: req.body.text,
    chatRoomId: 1
  });
  res.status(201);
  res.end(JSON.stringify(msg));
});

//======================================

//==============GET ALL MESSAGES (FROM ALL CHAT ROOMS)============

app.get("/message", async (req, res) => {
  //let { id } = req.params;
  /*if (id) {
    let msg = await Message.findById(id);
    res.end(JSON.stringify(msg));
  }*/

  let msgs = await Message.findAll();
  res.status(200);
  res.end(JSON.stringify(msgs));
});

//======================================

//=============GET MESSAGES FROM SPECIFIED CHAT ROOM============

app.get("/message/:chatRoomId?", async (req, res) => {
  let room = await Chat_rooms.findById(req.params.chatRoomId);
  let messages = await room.getMessages();
  res.status(201);
  res.end(JSON.stringify(messages));
});

//======================================

//=========GET ALL CHAT ROOMS===========

app.get("/rooms", async (req, res) => {
  console.log("Rooms request received");
  let rooms = await Chat_rooms.findAll();
  res.end(JSON.stringify(rooms));
  res.status(200);
});

//======================================

//=========CREATE NEW CHAT ROOM=========

app.post("/rooms", async (req, res) => {
  let room_name = req.body.name;
  if (room_name) {
    let cr = await Chat_rooms.create({
      name: room_name
    });
    res.status(201);
    res.end(JSON.stringify(cr));
  } else {
    let cr = await Chat_rooms.create({
      name: `Unnamed Room`
    });
    res.status(201);
    res.end(JSON.stringify(cr));
  }
});

//======================================

app.listen("3030", () => {
  console.log("Listening...");
});
