"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../abstracts/Action");
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "respawn"
        };
    }
    handle(base, peer, db, action) {
        peer.respawn();
        // TODO: respawn back to previous checkpoint
    }
}
exports.default = default_1;
