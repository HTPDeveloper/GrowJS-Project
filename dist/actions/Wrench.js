"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../abstracts/Action");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
const growtopia_js_1 = require("growtopia.js");
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "wrench"
        };
    }
    handle(base, peer, db, action) {
        let dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addButton("account_s", "Account Settings")
            .addButton("title", "Title")
            .addSpacer("small")
            .addLabelWithIcon(peer.data.tankIDName, "32", "small")
            .addTextBox(`Hello your name is ${peer.data.tankIDName}`)
            .addTextBox(`And your netID is ${peer.data.netID}`)
            .addQuickExit()
            .str();
        peer.send(growtopia_js_1.Variant.from({ delay: 100 }, "OnDialogRequest", dialog));
    }
}
exports.default = default_1;
