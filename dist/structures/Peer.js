"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peer = void 0;
const growtopia_js_1 = require("growtopia.js");
const Constants_1 = require("../utils/Constants");
const DataTypes_1 = require("../utils/enums/DataTypes");
const TankTypes_1 = require("../utils/enums/TankTypes");
const World_1 = require("./World");
class Peer extends growtopia_js_1.Peer {
    constructor(base, netID) {
        super(base.server, netID);
        this.base = base;
    }
    sendClothes() {
        this.send(growtopia_js_1.Variant.from({
            netID: this.data.netID
        }, "OnSetClothing", [this.data.clothing?.hair, this.data.clothing?.shirt, this.data.clothing?.pants], [this.data.clothing?.feet, this.data.clothing?.face, this.data.clothing?.hand], [this.data.clothing?.back, this.data.clothing?.mask, this.data.clothing?.necklace], 0x8295c3ff, [this.data.clothing?.ances, 0.0, 0.0]));
        this.everyPeer((p) => {
            if (p.data.world === this.data.world &&
                p.data.netID !== this.data.netID &&
                p.data.world !== "EXIT") {
                p.send(growtopia_js_1.Variant.from({
                    netID: this.data.netID
                }, "OnSetClothing", [this.data.clothing?.hair, this.data.clothing?.shirt, this.data.clothing?.pants], [this.data.clothing?.feet, this.data.clothing?.face, this.data.clothing?.hand], [this.data.clothing?.back, this.data.clothing?.mask, this.data.clothing?.necklace], 0x8295c3ff, [this.data.clothing?.ances, 0.0, 0.0]));
            }
        });
    }
    /** Extended version of setDataToCache */
    saveToCache() {
        this.base.cache.users.setSelf(this.data.netID, this.data);
        return;
    }
    /** Extended version of setDataToDatabase */
    async saveToDatabase() {
        return await this.base.database.saveUser(this.data);
    }
    getSelfCache() {
        return this.base.cache.users.getSelf(this.data.netID);
    }
    sound(file, delay = 100) {
        this.send(growtopia_js_1.TextPacket.from(DataTypes_1.DataTypes.ACTION, "action|play_sfx", `file|${file}`, `delayMS|${delay}`));
    }
    leaveWorld() {
        if (!this.data.world)
            return;
        const world = this.hasWorld(this.data.world);
        world?.leave(this);
    }
    get name() {
        switch (this.data.role) {
            default: {
                return `\`w${this.data.tankIDName}\`\``;
            }
            case Constants_1.Role.SUPPORTER: {
                return `\`e${this.data.tankIDName}\`\``;
            }
            case Constants_1.Role.DEVELOPER: {
                return `\`b@${this.data.tankIDName}\`\``;
            }
        }
    }
    everyPeer(callbackfn) {
        this.base.cache.users.forEach((p, k) => {
            const pp = this.base.cache.users.getSelf(p.netID);
            callbackfn(pp, k);
        });
    }
    hasWorld(worldName) {
        if (!worldName || worldName === "EXIT")
            return undefined;
        if (this.base.cache.worlds.has(worldName)) {
            return this.base.cache.worlds.getWorld(worldName);
        }
        else {
            let world = new World_1.World(this.base, worldName);
            return world;
        }
    }
    respawn() {
        const world = this.hasWorld(this.data.world);
        const mainDoor = world?.data.blocks?.find((block) => block.fg === 6);
        this.send(growtopia_js_1.Variant.from({ netID: this.data.netID }, "OnSetFreezeState", 1), growtopia_js_1.Variant.from({ netID: this.data.netID }, "OnKilled"), growtopia_js_1.Variant.from({ netID: this.data.netID, delay: 2000 }, "OnSetPos", [
            (mainDoor?.x % Constants_1.WORLD_SIZE.WIDTH) * 32,
            (mainDoor?.y % Constants_1.WORLD_SIZE.WIDTH) * 32
        ]), growtopia_js_1.Variant.from({ netID: this.data.netID, delay: 2000 }, "OnSetFreezeState", 0));
        this.sound("audio/teleport.wav", 2000);
    }
    enterWorld(worldName, x, y) {
        const world = this.hasWorld(worldName);
        const mainDoor = world?.data.blocks?.find((block) => block.fg === 6);
        world?.enter(this, { x: x ? x : mainDoor?.x, y: y ? y : mainDoor?.y });
        this.inventory();
        this.sound("audio/door_open.wav");
    }
    drop(id, amount) {
        if (this.data.world === "EXIT")
            return;
        const world = this.hasWorld(this.data.world);
        // world.getFromCache();
        const extra = Math.random() * 6;
        const x = this.data.x + (this.data.rotatedLeft ? -25 : +25) + extra;
        const y = this.data.y + extra - Math.floor(Math.random() * (3 - -1) + -3);
        world?.drop(this, x, y, id, amount);
    }
    addItemInven(id, amount = 1) {
        const item = this.data.inventory?.items.find((i) => i.id === id);
        if (!item)
            this.data.inventory?.items.push({ id, amount });
        else if (item.amount < 200)
            item.amount += amount;
        // this.inventory();
        this.saveToCache();
    }
    removeItemInven(id, amount = 1) {
        const item = this.data.inventory?.items.find((i) => i.id === id);
        if (item) {
            item.amount -= amount;
            if (item.amount < 1)
                this.data.inventory.items = this.data.inventory.items.filter((i) => i.id !== id);
        }
        // this.inventory();
        this.saveToCache();
    }
    inventory() {
        const inventory = this.data.inventory;
        this.send(growtopia_js_1.TankPacket.from({
            type: TankTypes_1.TankTypes.PEER_INVENTORY,
            data: () => {
                const buffer = Buffer.alloc(7 + inventory.items.length * 4);
                buffer.writeUInt8(0x1); // type?
                buffer.writeUInt32LE(inventory.max, 1);
                buffer.writeUInt16LE(inventory.items.length, 5);
                let offset = 7;
                inventory.items.forEach((item) => {
                    buffer.writeUInt16LE(item.id, offset);
                    buffer.writeUInt16LE(item.amount, offset + 2); // use bitwise OR (1 << 8) if item is equipped. could be wrong
                    offset += 4;
                });
                return buffer;
            }
        }));
    }
}
exports.Peer = Peer;
