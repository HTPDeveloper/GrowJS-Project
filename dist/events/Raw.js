"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Listener_1 = require("../abstracts/Listener");
const DataTypes_1 = require("../utils/enums/DataTypes");
const Utils_1 = require("../utils/Utils");
const Peer_1 = require("../structures/Peer");
const TankTypes_1 = require("../utils/enums/TankTypes");
const Tiles_1 = require("../utils/enums/Tiles");
const Place_1 = require("../tanks/Place");
const Punch_1 = require("../tanks/Punch");
const ItemTypes_1 = require("../utils/enums/ItemTypes");
const BlockWrench_1 = require("../tanks/BlockWrench");
const db_1 = require("../database/db");
class default_1 extends Listener_1.Listener {
    constructor() {
        super();
        this.name = "raw";
    }
    failGuest(peer) {
        peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "`4Unable to logon:`` Seems like you're on a guest account. Please register an account first from our website."), growtopia_js_1.TextPacket.from(DataTypes_1.DataTypes.ACTION, "action|set_url", `url|https://127.0.0.1/register`, "label|`$Create `9new`` Account``"));
        peer.disconnect();
    }
    async run(base, netID, data) {
        // prettier-ignore
        const peer = base.cache.users.has(netID) ? base.cache.users.getSelf(netID) : new Peer_1.Peer(base, netID);
        const dataType = data.readInt32LE();
        switch (dataType) {
            case DataTypes_1.DataTypes.STR:
            case DataTypes_1.DataTypes.ACTION: {
                let parsed = (0, Utils_1.parseAction)(data);
                console.log({ parsed, dataType });
                // Guest
                if (parsed?.requestedName && !parsed?.tankIDName && !parsed?.tankIDPass)
                    return this.failGuest(peer);
                // Using login & password
                if (parsed?.requestedName && parsed?.tankIDName && parsed?.tankIDPass) {
                    const username = parsed.tankIDName;
                    const password = parsed.tankIDPass;
                    base.database.getUser(username).then((user) => {
                        if (!user || password !== (0, Utils_1.decrypt)(user?.password)) {
                            peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "`4Failed`` logging in to that account. Please make sure you've provided the correct info."));
                            peer.send(growtopia_js_1.TextPacket.from(DataTypes_1.DataTypes.ACTION, "action|set_url", `url||https://127.0.0.1/recover`, "label|`$Recover your Password``"));
                            return peer.disconnect();
                        }
                        // Check if there's same account is logged in
                        const targetPeer = (0, Utils_1.find)(base, base.cache.users, (v) => v.data.id_user === user.id_user);
                        if (targetPeer) {
                            peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "`4Already Logged In?`` It seems that this account already logged in by somebody else."));
                            targetPeer.leaveWorld();
                            targetPeer.disconnect();
                        }
                        peer.send(growtopia_js_1.Variant.from("OnSuperMainStartAcceptLogonHrdxs47254722215a", base.items.hash, "ubistatic-a.akamaihd.net", "0098/748571133/cache/", "cc.cz.madkite.freedom org.aqua.gg idv.aqua.bulldog com.cih.gamecih2 com.cih.gamecih com.cih.game_cih cn.maocai.gamekiller com.gmd.speedtime org.dax.attack com.x0.strai.frep com.x0.strai.free org.cheatengine.cegui org.sbtools.gamehack com.skgames.traffikrider org.sbtoods.gamehaca com.skype.ralder org.cheatengine.cegui.xx.multi1458919170111 com.prohiro.macro me.autotouch.autotouch com.cygery.repetitouch.free com.cygery.repetitouch.pro com.proziro.zacro com.slash.gamebuster", "proto=192|choosemusic=audio/mp3/about_theme.mp3|active_holiday=0|wing_week_day=0|ubi_week_day=0|server_tick=638729041|clash_active=0|drop_lavacheck_faster=1|isPayingUser=0|usingStoreNavigation=1|enableInventoryTab=1|bigBackpack=1|"), growtopia_js_1.Variant.from("SetHasGrowID", 1, user.name, (0, Utils_1.decrypt)(user.password)), growtopia_js_1.Variant.from("SetHasAccountSecured", 1));
                        const defaultInventory = {
                            max: 32,
                            items: [
                                {
                                    id: 18,
                                    amount: 1
                                },
                                {
                                    id: 32,
                                    amount: 1
                                }
                            ]
                        };
                        const defaultClothing = {
                            hair: 0,
                            shirt: 0,
                            pants: 0,
                            feet: 0,
                            face: 0,
                            hand: 0,
                            back: 0,
                            mask: 0,
                            necklace: 0,
                            ances: 0
                        };
                        peer.data.tankIDName = user.name;
                        peer.data.rotatedLeft = false;
                        // peer.data.requestedName = parsed.requestedName as string;
                        peer.data.country = parsed?.country;
                        peer.data.id_user = user.id_user;
                        peer.data.role = user.role;
                        // prettier-ignore
                        peer.data.inventory = user.inventory?.length ? JSON.parse(user.inventory.toString()) : defaultInventory;
                        // prettier-ignore
                        peer.data.clothing = user.clothing?.length ? JSON.parse(user.clothing.toString()) : defaultClothing;
                        peer.data.gems = user.gems ? user.gems : 0;
                        peer.data.world = "EXIT";
                        // Load Gems
                        peer.send(growtopia_js_1.Variant.from("OnSetBux", peer.data.gems));
                        peer.saveToCache();
                        peer.saveToDatabase();
                    });
                }
                // Handle actions
                if (parsed?.action) {
                    try {
                        const action = base.action.get(parsed.action);
                        const db = new db_1.Database;
                        action?.handle(base, peer.getSelfCache(), db, parsed);
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                break;
            }
            case DataTypes_1.DataTypes.TANK: {
                if (data.length < 60) {
                    peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Received invalid tank packet."));
                    return peer.disconnect();
                }
                const tank = growtopia_js_1.TankPacket.fromBuffer(data);
                switch (tank.data?.type) {
                    default: {
                        console.log("Unknown tank", tank);
                        break;
                    }
                    case TankTypes_1.TankTypes.PEER_ICON: {
                        tank.data.state = peer.data.rotatedLeft ? 16 : 0;
                        peer.everyPeer((p) => {
                            if (p.data.world === peer.data.world && p.data.world !== "EXIT") {
                                p.send(tank);
                            }
                        });
                        break;
                    }
                    case TankTypes_1.TankTypes.PEER_CLOTH: {
                        tank.data.state = peer.data.rotatedLeft ? 16 : 0;
                        const item = base.items.metadata.items.find((v) => v.id === tank.data?.info);
                        const isAnces = () => {
                            if (item?.type === Tiles_1.ActionTypes.ANCES || item?.type === Tiles_1.ActionTypes.LOCK) {
                                if (peer.data.clothing.ances === tank.data?.info || peer.data.clothing.face === tank.data?.info)
                                    peer.data.clothing.ances = 0;
                                else
                                    peer.data.clothing.ances = tank.data?.info;
                                return true;
                            }
                            else {
                                return false;
                            }
                        };
                        switch (item?.bodyPartType) {
                            case ItemTypes_1.ClothTypes.HAIR: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.hair === tank.data.info)
                                    peer.data.clothing.hair = 0;
                                else
                                    peer.data.clothing.hair = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.SHIRT: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.shirt === tank.data.info)
                                    peer.data.clothing.shirt = 0;
                                else
                                    peer.data.clothing.shirt = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.PANTS: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.pants === tank.data.info)
                                    peer.data.clothing.pants = 0;
                                else
                                    peer.data.clothing.pants = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.FEET: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.feet === tank.data.info)
                                    peer.data.clothing.feet = 0;
                                else
                                    peer.data.clothing.feet = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.FACE: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.face === tank.data.info)
                                    peer.data.clothing.face = 0;
                                else
                                    peer.data.clothing.face = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.HAND: {
                                if (isAnces())
                                    break;
                                const handItem = base.items.metadata.items.find((item) => item.id === tank.data?.info);
                                if (peer.data.clothing.hand === tank.data.info)
                                    peer.data.clothing.hand = 0;
                                else
                                    peer.data.clothing.hand = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.BACK: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.back === tank.data.info)
                                    peer.data.clothing.back = 0;
                                else
                                    peer.data.clothing.back = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.MASK: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.mask === tank.data.info)
                                    peer.data.clothing.mask = 0;
                                else
                                    peer.data.clothing.mask = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.NECKLACE: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.necklace === tank.data.info)
                                    peer.data.clothing.necklace = 0;
                                else
                                    peer.data.clothing.necklace = tank.data.info;
                                break;
                            }
                            case ItemTypes_1.ClothTypes.ANCES: {
                                if (isAnces())
                                    break;
                                if (peer.data.clothing.ances === tank.data.info)
                                    peer.data.clothing.ances = 0;
                                else
                                    peer.data.clothing.ances = tank.data.info;
                                break;
                            }
                        }
                        peer.saveToCache();
                        peer.saveToDatabase();
                        peer.sendClothes();
                        break;
                    }
                    case TankTypes_1.TankTypes.PEER_MOVE: {
                        if (peer.data.world === "EXIT")
                            break;
                        tank.data.netID = peer.data.netID;
                        peer.data.x = tank.data.xPos;
                        peer.data.y = tank.data.yPos;
                        peer.data.rotatedLeft = Boolean(tank.data.state & 0x10);
                        peer.saveToCache();
                        peer.everyPeer((p) => {
                            if (p.data.world === peer.data.world && p.data.world !== "EXIT") {
                                p.send(tank);
                            }
                        });
                        break;
                    }
                    case TankTypes_1.TankTypes.TILE_PUNCH: {
                        const world = peer.hasWorld(peer.data.world);
                        tank.data.netID = peer.data.netID;
                        // Fist
                        if (tank.data.info === 18) {
                            (0, Punch_1.handlePunch)(tank, peer, base, world);
                        }
                        else if (tank.data.info === 32) {
                            (0, BlockWrench_1.handleWrench)(base, tank, peer, world);
                        }
                        // Others
                        else {
                            (0, Place_1.handlePlace)(tank, peer, base, world);
                        }
                        break;
                    }
                    case TankTypes_1.TankTypes.PEER_COLLECT: {
                        const world = peer.hasWorld(peer.data.world);
                        const dropped = world?.data.dropped?.items.find((i) => i.uid === tank.data?.info);
                        world?.collect(peer, dropped.uid);
                        break;
                    }
                    case TankTypes_1.TankTypes.PEER_ENTER_DOOR: {
                        if (peer.data.world === "EXIT")
                            return;
                        let world = peer.hasWorld(peer.data.world);
                        const pos = tank.data.xPunch + tank.data.yPunch * world?.data.width;
                        const block = world?.data.blocks[pos];
                        if (!block || !block.door)
                            return;
                        if (block.fg === 6)
                            return peer.leaveWorld();
                        const worldDes = block.door?.destination?.split(":");
                        if (!worldDes[0])
                            worldDes[0] = peer.data.world;
                        const worldName = worldDes[0];
                        const id = worldDes[1];
                        if (worldName === peer.data.world) {
                            let door = world?.data.blocks?.find((b) => b.door && b.door.id === id);
                            if (!door)
                                door = world?.data.blocks?.find((b) => b.fg === 6);
                            const doorX = (door?.x || 0) * 32;
                            const doorY = (door?.y || 0) * 32;
                            peer.data.x = doorX;
                            peer.data.y = doorY;
                            peer.send(growtopia_js_1.Variant.from("OnZoomCamera", [10000], 1000));
                            peer.everyPeer((p) => {
                                if (p.data.world === peer.data.world && p.data.world !== "EXIT") {
                                    p.send(growtopia_js_1.Variant.from({ netID: peer.data.netID }, "OnSetFreezeState", 0), growtopia_js_1.Variant.from({
                                        netID: peer.data.netID
                                    }, "OnSetPos", [doorX, doorY]), growtopia_js_1.Variant.from({
                                        netID: peer.data.netID
                                    }, "OnPlayPositioned", "audio/door_open.wav"));
                                }
                            });
                        }
                        else {
                            if (worldName === "EXIT")
                                return peer.leaveWorld();
                            else {
                                let wrld = peer.hasWorld(worldName);
                                let door = wrld?.data.blocks?.find((b) => b.door && b.door.id === id);
                                if (!door)
                                    door = wrld?.data.blocks?.find((b) => b.fg === 6);
                                world.data.playerCount--;
                                peer.everyPeer((p) => {
                                    if (p.data.netID !== peer.data.netID &&
                                        p.data.world === peer.data.world &&
                                        p.data.world !== "EXIT") {
                                        p.send(growtopia_js_1.Variant.from("OnRemove", `netID|${peer.data.netID}`), growtopia_js_1.Variant.from("OnConsoleMessage", `\`5<${peer.name}\`\` left, \`w${world?.data.playerCount}\`\` others here\`5>\`\``), growtopia_js_1.Variant.from("OnTalkBubble", peer.data.netID, `\`5<${peer.name}\`\` left, \`w${world?.data.playerCount}\`\` others here\`5>\`\``), growtopia_js_1.TextPacket.from(DataTypes_1.DataTypes.ACTION, "action|play_sfx", `file|audio/door_shut.wav`, `delayMS|0`));
                                    }
                                });
                                peer.enterWorld(worldName, door?.x, door?.y);
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
}
exports.default = default_1;
