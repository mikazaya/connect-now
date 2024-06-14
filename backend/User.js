"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, socket, username) {
        this.id = id;
        this.socket = socket;
        this.username = username;
    }
    User.prototype.describe = function () {
        return { id: this.id, username: this.username };
    };
    return User;
}());
exports.default = User;
