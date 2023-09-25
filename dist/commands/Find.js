"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Command_1 = require("../abstracts/Command");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
const Constants_1 = require("../utils/Constants");
class default_1 extends Command_1.Command {
    constructor() {
        super();
        this.opt = {
            name: "find",
            description: "Find some items",
            cooldown: 5,
            ratelimit: 5,
            category: "Basic",
            usage: "/find",
            example: ["/find"],
            permission: [Constants_1.Role.BASIC, Constants_1.Role.SUPPORTER, Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        let dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon("Find the item", "6016", "big")
            .addCheckbox("seed_only", "Only seed", "not_selected")
            .addInputBox("find_item_name", "", "", 30)
            .addQuickExit()
            .endDialog("find_item", "Cancel", "Find")
            .str();
        peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
    }
}
exports.default = default_1;
