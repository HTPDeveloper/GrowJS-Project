"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Command_1 = require("../abstracts/Command");
const Constants_1 = require("../utils/Constants");
class default_1 extends Command_1.Command {
    constructor() {
        super();
        this.opt = {
            name: "sb",
            description: "Super broadcast to players online.",
            cooldown: 10,
            ratelimit: 1,
            category: "Basic",
            usage: "/sb",
            example: ["/sb"],
            permission: [Constants_1.Role.BASIC, Constants_1.Role.SUPPORTER, Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        let gemsLeft = peer.data.gems - 1000;
        const broadcastMessage = args.join(" ");
        if (peer.data.gems < 1000)
            return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Could'nt broadcast, not enough gems."));
        if (!args[0])
            return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Could'nt broadcast, try again with interesting words."));
        peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `** \`pSuper-Broadcast \`0from ${peer.data.tankIDName} (in \`o${peer.data.world}\`0) **: \`#${broadcastMessage}`));
        peer.send(growtopia_js_1.Variant.from("OnSetBux", parseInt(`${gemsLeft}`)));
        peer.data.gems = parseInt(`${gemsLeft}`);
        peer.saveToCache();
        peer.saveToDatabase();
    }
}
exports.default = default_1;
