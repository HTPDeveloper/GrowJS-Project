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
            name: "startcarnival",
            description: "Open Carnival.",
            cooldown: 0,
            ratelimit: 1,
            category: "Basic",
            usage: "/startcarnival",
            example: ["/startcarnival"],
            permission: [Constants_1.Role.BASIC, Constants_1.Role.SUPPORTER, Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        peer.everyPeer((p) => {
            p.send(growtopia_js_1.Variant.from("OnConsoleMessage", "`2Carnival has come to town`0, visit the world `9CARNIVAL`0, try your luck at winning one of the ringmaster's fabulous rings!"));
            data.set(`Carnival`, true);
        });
    }
}
exports.default = default_1;
