"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Room_1 = require("./Room");
var User_1 = require("./User");
var short_unique_id_1 = require("short-unique-id");
var app = express();
var PORT = 5000;
var server = app.listen(PORT, function () {
    console.log("listening on ".concat(PORT));
});
var io = require("socket.io")(server);
var users = new Map();
var rooms = new Map();
var randomUUID = new short_unique_id_1.default({ length: 10 }).randomUUID;
rooms.set("test", Room_1.default.create("test", io));
console.log(rooms["test"]);
var getRoom = function (roomId) {
    var r;
    if (roomId) {
        r = rooms.get(roomId);
    }
    else {
        var newRoomId = randomUUID();
        r = Room_1.default.create(newRoomId, io);
    }
    return r;
};
io.on("connection", function (socket) {
    var _a;
    socket.onAny(function (event, message) { return console.log(event, message); });
    var user = new User_1.default(socket.handshake.query.id.toString(), //Implement server side later
    socket, socket.handshake.query.username.toString());
    var room = getRoom((_a = socket.handshake.query.roomId) === null || _a === void 0 ? void 0 : _a.toString());
    if (!room) {
        socket.emit("error", "No room found");
        return;
    }
    else {
        socket.join(room.id);
        users.set(user.id, room);
        room.addUserRef(user);
        rooms.set(room.id, room);
    }
    socket.on("chat-message", function (message) {
        room.broadcast(message);
    });
    socket.on("line-draw", function (line) {
        room.broadcastEvent("line-draw", line);
    });
    socket.on("disconnect", function () {
        room.removeUserRef(user);
        users.delete(user.id);
        socket.leave(room.id);
    });
});
