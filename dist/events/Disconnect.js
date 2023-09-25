"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Listener_1 = require("../abstracts/Listener");
class default_1 extends Listener_1.Listener {
    constructor() {
        super();
        this.name = "disconnect";
    }
    run(base, netID) {
        console.log("Peer", netID, "disconnected");
        let peer = base.cache.users.getSelf(netID);
        peer?.leaveWorld();
        peer?.saveToDatabase();
        base.cache.users.delete(netID);
    }
}
exports.default = default_1;
