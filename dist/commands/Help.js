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
            name: "help",
            description: "Shows every available commands",
            cooldown: 5,
            ratelimit: 5,
            category: "Basic",
            usage: "/help <command_name?>",
            example: ["/help", "/help ping"],
            permission: [Constants_1.Role.BASIC, Constants_1.Role.SUPPORTER, Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        if (args.length > 0) {
            if (!base.commands.has(args[0]))
                return peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `It seems that commands doesn't exist.`));
            let cmd = base.commands.get(args[0]);
            let dialog = new DialogBuilder_1.DialogBuilder()
                .defaultColor()
                .addLabelWithIcon(cmd?.opt.name, "32", "small")
                .addSpacer("small")
                .addSmallText(`Description: ${cmd?.opt.description}`)
                .addSmallText(`Cooldown: ${cmd?.opt.cooldown}`)
                .addSmallText(`Ratelimit: ${cmd?.opt.ratelimit}`)
                .addSmallText(`Permissions: ${cmd?.opt.permission.length ? cmd.opt.permission : "None"}`)
                .addSmallText(`Usage: ${cmd?.opt.usage}`)
                .addSmallText(`Example: ${cmd?.opt.example.join(", ")}`)
                .endDialog("help_end", "", "Ok")
                .addQuickExit();
            return peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog.str()));
        }
        let dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon("Help", "32", "small")
            .addSpacer("small");
        base.commands.forEach((cmd) => {
            dialog.addLabelWithIcon(cmd.opt.usage, "482", "small");
        });
        dialog.endDialog("help_end", "", "Ok");
        dialog.addQuickExit();
        peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog.str()));
    }
}
exports.default = default_1;
