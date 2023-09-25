"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../abstracts/Action");
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "quit"
        };
    }
    handle(base, peer, db, action) {
        peer.disconnect();
    }
}
exports.default = default_1;
