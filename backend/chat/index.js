const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html', "texto/html");
})

app.get("/:room", (req, res) =>  {
    let room = req.params.room;
    if(searchRoom(room)){
        res.sendFile(__dirname + `/public/html/chat.html`, "texto/html");
    }else{
        res.sendFile(__dirname + '/public/html/index.html', "texto/html");
    }
});

io.on("connection", (socket) =>{
    console.log("user connected");

    socket.on("unirse", function (room) {
        if(searchRoom(room )){
            let rt = `/${room}`;
            socket.emit("redirect", rt);
        }else{
            let mse =`No se encontro la sala ${room}`
            socket.emit("noEncontrado", mse);
        }
    });

    socket.on('createRoom', (datos)=>{
        console.log(datos);
        if(searchRoom(datos[0]) ){
            let mse =`Ya existe la sala ${datos[0]}`
            socket.emit("noEncontrado", mse);
        }else{
            createRoom(datos[0], datos[1]);
            if(searchRoom(datos[0])){
                let rt = `/${datos[0]}`;
                socket.emit("redirect", rt);
            }
        }
    });

    socket.on("password", (datos, callback)=>{
        let result = searchPassword(datos[0], datos[1]);
        callback(result);
    });

    socket.on('enviar mensaje', (datos) =>{
        io.sockets.emit(`${datos.nameRoom} mensaje`, {msg : datos.msg, nick: datos.nick});
    });

    socket.on('nuevo usuario', (datos, callback) => {

        if(nuevoUser(datos.name, datos.nameRoom)){
            callback(true);
            let nickNames = fs.readFileSync(`./private/json/room/user_${datos.nameRoom}.json`);
            nickNames = JSON.parse(nickNames);
            io.sockets.emit(`usernames ${datos.nameRoom}`, nickNames);
        }else{
            callback(false);
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(app.get('port'), ()=>{
    console.log("listening on port "+ app.get('port') );
});

function createRoom(roomName, password) {
    fs.writeFile(`./private/json/room/${roomName}.json`,"[]",(error)=>{
        if(error) {
            socket.emit("noEncontrado", error);
            return;
        }
    });
    fs.writeFile(`./private/json/room/user_${roomName}.json`,"[]",(error)=>{
        if(error) {
            socket.emit("noEncontrado", error);
            return;
        }
    });
    let data = fs.readFileSync('./private/json/data.json');
    data = JSON.parse(data);
    data.push({
        "name": roomName,
        "password": password
    });
    data = JSON.stringify(data);
    fs.writeFileSync('./private/json/data.json', data);
}
function searchRoom(RoomName) {
    let data = fs.readFileSync('./private/json/data.json');
    data = JSON.parse(data);
    for(let item of data) {
        if(item.name == RoomName) {
            return true;
        }
    }
    return false;
}
function searchPassword(password, room) {
    let data = fs.readFileSync('./private/json/data.json');
    data = JSON.parse(data);
    for(let item of data) {
        if(item.name == room) {
            if(item.password == password){return true;}
        }
    }
    return false;
}

function nuevoUser(name, room){
    let data = fs.readFileSync(`./private/json/room/user_${room}.json`);
    data = JSON.parse(data);
    for(let item of data) {
        if(item.nick == name) {
            return false;
        }
    }
    data.push({
        "nick": name,
    });
    data = JSON.stringify(data);
    fs.writeFileSync(`./private/json/room/user_${room}.json`, data);
    return true;
}