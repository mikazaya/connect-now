"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./models/enums");
var Round = /** @class */ (function () {
    function Round() {
        this.word = "Round";
        this.state = enums_1.default.none;
    }
    Round.prototype.startRound = function () {
        var _this = this;
        this.state = enums_1.default.running;
        setTimeout(function () {
            _this.endRound();
        }, 60000);
    };
    Round.prototype.endRound = function () {
        this.state = enums_1.default.end;
    };
    return Round;
}());
exports.default = Round;
