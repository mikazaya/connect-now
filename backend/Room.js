"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./models/enums");
var Round_1 = require("./Round");
var Room = /** @class */ (function () {
    function Room(roomId, io) {
        this.id = roomId;
        this.io = io;
        this.userRefs = new Map();
    }
    Room.create = function (roomId, io) {
        return new Room(roomId, io);
    };
    Room.prototype.addUserRef = function (user) {
        this.userRefs.set(user.id, user);
        var r = [];
        this.userRefs.forEach(function (val) { return r.push(val.describe()); });
        this.broadcastEvent("user-join", { users: r, id: this.id });
    };
    Room.prototype.removeUserRef = function (user) {
        this.userRefs.delete(user.id);
        var r = [];
        this.userRefs.forEach(function (val) { return r.push(val.describe()); });
        this.broadcastEvent("user-leave", r);
    };
    Room.prototype.broadcast = function (message) {
        this.io.to(this.id).emit("chat-message", message);
    };
    Room.prototype.broadcastEvent = function (event, message) {
        this.io.to(this.id).emit(event, message);
    };
    Room.prototype.startRound = function () {
        if (this.round.state === enums_1.default.running)
            return;
        this.round = new Round_1.default();
        this.round.startRound();
    };
    return Room;
}());
exports.default = Room;
