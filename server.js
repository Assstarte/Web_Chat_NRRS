//==================
//Crucial Imports
//==================
require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");

app.set("trust proxy", 1); // trust first proxy

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

//==================
//MYSQL
//==================

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "chat_v2",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const Message = sequelize.define("message", {
  nick: Sequelize.STRING,
  message: Sequelize.STRING
});

const Chat_rooms = sequelize.define("chat_rooms", {
  name: Sequelize.STRING,
  owner_name: Sequelize.STRING
});

const User = sequelize.define("users", {
  login: Sequelize.STRING,
  password: Sequelize.STRING
});

Chat_rooms.hasMany(Message);
Message.belongsTo(Chat_rooms);

User.belongsToMany(Chat_rooms, { through: "User_Chatroom" });
Chat_rooms.belongsToMany(User, { through: "User_Chatroom" });

User.hasMany(Message);
Message.belongsTo(User, { as: "Msg_Owner" });

Chat_rooms.belongsTo(User, { as: "Owner" });

//Chat_rooms.hasMany(Message, {as: ''})

sequelize.sync();

//=========GraphQL=========
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

var schema = buildSchema(`
    type Query {
        getMessage(id: Int!): Message
        getMessagesFromChatRoom(id: Int!): [Message]
        getChatRooms: [Room]
    }

    type Message {
        id: Int
        nick: String
        message:  String
        createdAt:   String
        updatedAt:  String
        chatRoomId: Int
        userId: Int
        MsgOwnerId: Int
    }
    type Room {
        id: Int
        name:  String
        createdAt:   String
        updatedAt: String
        OwnerId: Int
        owner_name: String
    }
`);

//========Resolvers========
async function getMessage({ id }) {
  return await Message.findById(id);
}

async function getMessagesFromChatRoom({ id }) {
  let room = await Chat_rooms.findById(id);
  let messages = await room.getMessages();
  return messages;
}

async function getChatRooms({ id }) {
  return await Chat_rooms.findAll({});
}
//=========================

let rootGraph = {
  getMessage,
  getMessagesFromChatRoom,
  getChatRooms
};

app.use(
  "/api",
  express_graphql({
    schema: schema,
    rootValue: rootGraph,
    graphiql: true
  })
);

//=========================

//===========================
//Controllers (REST Endpoints)
//===========================

//=========CREATE NEW MSG IN CHAT ROOM==========

app.post("/message/room/:room_id?", async (req, res) => {
  console.log("Request Received");
  let { room_id } = req.params;
  if (!room_id) {
    let msg = await Message.create({
      nick: req.body.user_name,
      message: req.body.text,
      chatRoomId: req.body.chatRoomId,
      userId: req.body.userId,
      ownerId: req.body.userId
    });
    res.status(201);
    res.end(JSON.stringify(msg));
  } else {
    let msg = await Message.create({
      nick: req.body.user_name,
      message: req.body.text,
      chatRoomId: room_id,
      userId: req.body.userId,
      MsgOwnerId: req.body.userId
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
    nick: req.body.user_name,
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
  let creatorID = req.body.creator;
  let creatorName = req.body.creatorName;
  if (room_name) {
    let cr = await Chat_rooms.create({
      name: room_name,
      OwnerId: creatorID,
      owner_name: creatorName
    });
    res.status(201);
    res.end(JSON.stringify(cr));
  } else {
    let cr = await Chat_rooms.create({
      name: `Unnamed Room`,
      owner_name: creatorName,
      OwnerId: creatorID
    });
    res.status(201);
    res.end(JSON.stringify(cr));
  }
});

//======================================

//=============Signup=============

app.post("/signup", async (req, res) => {
  if (!(req.body.login && req.body.password)) throw new Error("Invalid body");
  //Check if registered
  let checkQuery = await User.findOne({
    where: {
      login: req.body.login
    }
  });

  console.log(checkQuery);

  if (checkQuery) {
    res.status(400);
    res.end(JSON.stringify({ created: false }));

    throw new Error("User already exists");
  } else {
    let createdUser = await User.create({
      login: req.body.login,
      password: req.body.password
    });
    res.status(201);
    res.end(JSON.stringify({ created: true }));
  }
});

app.post("/login", async (req, res) => {
  if (!(req.body.login && req.body.password)) throw new Error("Invalid body");

  let checkQuery = await User.findOne({
    where: {
      login: req.body.login,
      password: req.body.password
    }
  });

  if (checkQuery) {
    checkQuery = JSON.parse(JSON.stringify(checkQuery));
    delete checkQuery.password;
    console.log(JSON.stringify(checkQuery));
    req.session.auth = checkQuery;
    req.session.auth.loggedIn = true;

    res.write(JSON.stringify(req.session.auth));
    res.end();

    console.log(req.session);
    res.status(200);
  } else {
    res.status(401);
    let deniedResponse = {
      loggedIn: false
    };

    res.write(JSON.stringify(deniedResponse));
    res.end();
  }
});

app.get("/whoami", async (req, res) => {
  res.end(
    req.session.auth
      ? JSON.stringify(req.session.auth)
      : JSON.stringify({ session: "DENIED" })
  );
  res.status(200);
});

app.get("/logout", (req, res) => {
  if (req.session) {
    // delete session object
    console.log("======SESSION EXISTS. ERASING!==========");
    req.session = null;
    res.status(200);
    res.end(JSON.stringify({ session: "ERASED" }));
  }
});

app.listen("3030", () => {
  console.log("Listening...");
});
