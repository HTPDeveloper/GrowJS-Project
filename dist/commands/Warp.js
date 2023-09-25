"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Command_1 = require("../abstracts/Command");
const Constants_1 = require("../utils/Constants");
class default_1 extends Command_1.Command {
    constructor() {
        super();
        this.opt = {
            name: "warp",
            description: "Warp to a world, using command.",
            cooldown: 10,
            ratelimit: 1,
            category: "Basic",
            usage: "/warp",
            example: ["/warp <world>"],
            permission: [Constants_1.Role.BASIC, Constants_1.Role.SUPPORTER, Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        const inapp = ["fuck", "porn", "dick", "pussy", "vargina", "kontol", "memek"];
        if (!args[0])
            return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Please mention a world that is vaild."));
        if (args[0].match(/\W+|_|EXIT/gi) || args[0].match("fuck") || args[0].match("porn") || args[0].match("dick") || args[0].match("pussy") || args[0].match("vargina") || args[0].match("kontol") || args[0].match("dick"))
            return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Please mention a world that is vaild."));
        peer.enterWorld(args[0]);
        return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Entering world >>> " + args[0] + "..."));
    }
}
exports.default = default_1;
