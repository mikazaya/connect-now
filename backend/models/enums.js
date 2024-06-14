"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoundState;
(function (RoundState) {
    RoundState[RoundState["none"] = 0] = "none";
    RoundState[RoundState["running"] = 1] = "running";
    RoundState[RoundState["end"] = 2] = "end";
})(RoundState || (RoundState = {}));
exports.default = RoundState;
