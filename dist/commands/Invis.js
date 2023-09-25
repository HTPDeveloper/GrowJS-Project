"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Command_1 = require("../abstracts/Command");
const Constants_1 = require("../utils/Constants");
class default_1 extends Command_1.Command {
    constructor() {
        super();
        this.opt = {
            name: "invis",
            description: "Super broadcast to players online.",
            cooldown: 10,
            ratelimit: 1,
            category: "Basic",
            usage: "/invis",
            example: ["/invis"],
            permission: [Constants_1.Role.BASIC, Constants_1.Role.SUPPORTER, Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        growtopia_js_1.TankTypes.SET_CHARACTER_STATE;
        peer.send(growtopia_js_1.Variant.from({ delay: -1 }, "OnSpawn", "spawn|avatar\n" +
            `netID|${peer.data.netID}\n` +
            `userID|${peer.data.id_user}\n` +
            `colrect|0|0|20|30\n` +
            `posXY|${peer.data.x}|${peer.data.y}\n` +
            `name|\`w${peer.name}\`\`\n` +
            `country|${peer.data.country}\n` +
            "invis|1\n" +
            "mstate|0\n" +
            "smstate|0\n" +
            "onlineID|\n"));
    }
}
exports.default = default_1;
