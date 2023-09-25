"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const Peer_1 = require("./Peer");
const World_1 = require("./World");
class Collection extends Map {
    constructor(base) {
        if (!base)
            throw new Error("Server are required.");
        super();
        this.base = base;
    }
    getSelf(key) {
        const peerData = this.get(key);
        let peer = new Peer_1.Peer(this.base, peerData?.netID);
        peer.data = peerData;
        return peer;
    }
    setSelf(key, value) {
        this.set(key, value);
    }
    getWorld(key) {
        const worldData = this.get(key);
        let world = new World_1.World(this.base, worldData?.name);
        world.data = worldData;
        return world;
    }
    setWorld(key, value) {
        this.set(key, value);
    }
    findPeer(func) {
        const users = this;
        for (const item of users.values()) {
            const peer = users.getSelf(item.netID);
            if (func(peer)) {
                return peer;
            }
        }
        return undefined;
    }
    filterPeer(func) {
        const arr = [];
        for (const item of this.values()) {
            if (func(item)) {
                arr.push(item);
            }
        }
        return arr;
    }
}
exports.Collection = Collection;
