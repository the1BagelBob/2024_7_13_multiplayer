const express = require("express");

const app = express();

const path = require("path");
const http = require("http");
const {Server} = require("socket.io");


const server = http.createServer(app);

const io = new Server(server);
app.use(express.static(path.resolve("")))

let arr = [];
let playingArray = [];

io.on("connection", (socket) =>{

  socket.on("find", (e) => {
    console.log(e);
    if(e.name !== null){
      arr.push(e.name);

      if(arr.length >= 2){
        let p1obj = {
          p1name: arr[0],
          p1value: 'X',
          p1move: ""
        }
        let p2obj = {
          p2name: arr[1],
          p2value: 'O',
          p2move: ""
        }

        let obj = {
          p1: p1obj,
          p2: p2obj
        }

        playingArray.push(obj);

        arr.splice(0, 2);

        io.emit("find", {allPlayers: playingArray});
      }
    }
  });

});

app.get("/", (req, res) => {
  return res.sendFile("index.html");
});

server.listen(3000, () => {
  console.log("port connected to 3000");
});