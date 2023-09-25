"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Command_1 = require("../abstracts/Command");
const Constants_1 = require("../utils/Constants");
const quick_db_1 = require("quick.db");
const data = new quick_db_1.QuickDB;
class default_1 extends Command_1.Command {
    constructor() {
        super();
        this.opt = {
            name: "event",
            description: "Start a new world event.",
            cooldown: 0,
            ratelimit: 1,
            category: "Basic",
            usage: "/event",
            example: ["/event"],
            permission: [Constants_1.Role.BASIC, Constants_1.Role.SUPPORTER, Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        peer.everyPeer((p) => {
            p.send(growtopia_js_1.Variant.from("OnTextOverlay", "`2Starting Event...!"));
            data.set(`onEvent_${peer.data.world}`, true);
        });
    }
}
exports.default = default_1;
