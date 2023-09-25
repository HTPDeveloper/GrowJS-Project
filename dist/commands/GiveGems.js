"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Command_1 = require("../abstracts/Command");
const Constants_1 = require("../utils/Constants");
const Utils_1 = require("../utils/Utils");
class default_1 extends Command_1.Command {
    constructor() {
        super();
        this.opt = {
            name: "givegems",
            description: "Give gems to someone or self",
            cooldown: 5,
            ratelimit: 5,
            category: "Developer",
            usage: "/givegems <gems> <to_who?>",
            example: ["/givegems 100", "/givegems 100 JadlionHD"],
            permission: [Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        if (!args[0])
            return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `Gems amount are required.`));
        if (!/\d/.test(args[0]))
            return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `Gems amount are must be a number.`));
        if (args.length > 1) {
            const targetPeer = (0, Utils_1.find)(base, base.cache.users, (user) => user.data.tankIDName.toLowerCase().includes(args[1].toLowerCase()));
            if (!targetPeer)
                return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `Make sure that player is online.`));
            targetPeer.send(growtopia_js_1.Variant.from("OnSetBux", parseInt(args[0])));
            targetPeer.data.gems = parseInt(args[0]);
            targetPeer.saveToCache();
            targetPeer.saveToDatabase();
            peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `Sucessfully sending \`w${args[0]}\`\` gems to ${targetPeer.name}`));
        }
        else {
            peer.send(growtopia_js_1.Variant.from("OnSetBux", parseInt(args[0])));
            peer.data.gems = parseInt(args[0]);
            peer.saveToCache();
            // peer.saveToDatabase();
            peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `Sucessfully received \`w${args[0]}\`\` gems.`));
        }
    }
}
exports.default = default_1;
