"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Listener_1 = require("../abstracts/Listener");
const Peer_1 = require("../structures/Peer");
class default_1 extends Listener_1.Listener {
    constructor() {
        super();
        this.name = "connect";
    }
    run(base, netID) {
        console.log("Peer", netID, "connected.");
        const peer = new Peer_1.Peer(base, netID);
        const packet = growtopia_js_1.TextPacket.from(0x1);
        peer.send(packet);
        base.cache.users.setSelf(netID, peer.data);
    }
}
exports.default = default_1;
