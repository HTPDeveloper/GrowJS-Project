"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleTile = void 0;
const Tiles_1 = require("../utils/enums/Tiles");
function HandleTile(base, block, world, actionType) {
    let buf;
    const lockPos = block.lock && !block.lock.isOwner
        ? block.lock.ownerX + block.lock.ownerY * world.data.width
        : 0;
    switch (actionType) {
        case Tiles_1.ActionTypes.PORTAL:
        case Tiles_1.ActionTypes.DOOR:
        case Tiles_1.ActionTypes.MAIN_DOOR: {
            const label = block.door?.label || "";
            buf = Buffer.alloc(12 + label.length);
            buf.writeUInt32LE(block.fg | (block.bg << 16));
            buf.writeUint16LE(lockPos, 4);
            buf.writeUint16LE(Tiles_1.Flags.FLAGS_TILEEXTRA, 6);
            buf.writeUint8(Tiles_1.ExtraTypes.DOOR, 8);
            buf.writeUint16LE(label.length, 9);
            buf.write(label, 11);
            // first param locked/not (0x8/0x0)
            buf.writeUint8(0x0, 11 + label.length);
            return buf;
        }
        case Tiles_1.ActionTypes.SIGN: {
            let flag = 0x0;
            const label = block.sign?.label || "";
            buf = Buffer.alloc(15 + label.length);
            if (block.rotatedLeft)
                flag |= Tiles_1.Flags.FLAGS_ROTATED_LEFT;
            buf.writeUInt32LE(block.fg | (block.bg << 16));
            buf.writeUint16LE(lockPos, 4);
            buf.writeUint16LE(Tiles_1.Flags.FLAGS_TILEEXTRA, 6);
            buf.writeUint8(Tiles_1.ExtraTypes.SIGN, 8);
            buf.writeUint16LE(label.length, 9);
            buf.write(label, 11);
            buf.writeInt32LE(-1, 11 + label.length);
            return buf;
        }
        case Tiles_1.ActionTypes.HEART_MONITOR: {
            // ET ID ID ID ID NL NL <name>
            const name = block.heartMonitor?.name || "";
            const id = block.heartMonitor?.user_id || 0;
            let flag = 0x0;
            // Check if the peer offline/online
            const targetPeer = base.cache.users.findPeer((p) => p.data.id_user === id);
            if (targetPeer)
                flag |= Tiles_1.Flags.FLAGS_OPEN;
            if (block.rotatedLeft)
                flag |= Tiles_1.Flags.FLAGS_ROTATED_LEFT;
            buf = Buffer.alloc(15 + name.length);
            buf.writeUInt32LE(block.fg | (block.bg << 16));
            buf.writeUint16LE(lockPos, 4);
            buf.writeUint16LE(flag, 6);
            buf.writeUint8(Tiles_1.ExtraTypes.HEART_MONITOR, 8);
            buf.writeUint32LE(id, 9);
            buf.writeUint16LE(name.length, 13);
            buf.write(name, 15);
            return buf;
        }
        case Tiles_1.ActionTypes.DISPLAY_BLOCK: {
            buf = Buffer.alloc(13);
            buf.writeUInt32LE(block.fg | (block.bg << 16));
            buf.writeUint16LE(0x0, 4);
            buf.writeUint16LE(0x0, 6);
            buf.writeUint8(Tiles_1.ExtraTypes.DISPLAY_BLOCK, 8);
            buf.writeUint32LE(block.dblockID, 9);
            return buf;
        }
        case Tiles_1.ActionTypes.LOCK: {
            const owner = (block.lock ? block.lock.ownerUserID : world.data.owner?.id);
            // 0 = admincount
            buf = Buffer.alloc(26 + 4 * 0);
            buf.writeUInt32LE(block.fg | (block.bg << 16));
            buf.writeUint16LE(lockPos, 4);
            buf.writeUint16LE(Tiles_1.Flags.FLAGS_TILEEXTRA, 6);
            buf.writeUInt16LE(Tiles_1.ExtraTypes.LOCK | (0x0 << 8), 8);
            buf.writeUInt32LE(owner, 10);
            buf.writeUInt32LE(0, 14); // admin count
            buf.writeInt32LE(-1, 18);
            return buf;
        }
        case Tiles_1.ActionTypes.SEED: {
            buf = Buffer.alloc(14);
            buf.writeUInt32LE(block.fg | (block.bg << 16));
            buf.writeUint16LE(lockPos, 4);
            buf.writeUint16LE(0x0, 6);
            buf.writeUint8(Tiles_1.ExtraTypes.SEED, 8);
            buf.writeUInt32LE(Math.floor((Date.now() - block.tree?.plantedAt) / 1000), 9);
            buf.writeUInt8(block.tree?.fruitCount > 4 ? 4 : block.tree?.fruitCount, 13);
            return buf;
        }
        case Tiles_1.ActionTypes.XENONITE: {
            buf = Buffer.alloc(13);
            buf.writeUInt32LE(block.fg | (block.bg << 16));
            buf.writeUint16LE(0x0, 4);
            buf.writeUint16LE(0x0, 6);
            buf.writeUint8(Tiles_1.ExtraTypes.DISPLAY_BLOCK, 8);
            buf.writeUint32LE(block.dblockID, 9);
            return buf;
        }
        default: {
            buf = Buffer.alloc(8);
            buf.writeUInt32LE(block.fg | (block.bg << 16));
            buf.writeUint16LE(lockPos, 4);
            buf.writeUint16LE(Tiles_1.Flags.FLAGS_PUBLIC, 6);
            return buf;
        }
    }
}
exports.HandleTile = HandleTile;
