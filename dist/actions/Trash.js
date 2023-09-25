"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../abstracts/Action");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
const growtopia_js_1 = require("growtopia.js");
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "trash"
        };
    }
    handle(base, peer, db, action) {
        const itemID = parseInt(action.itemID);
        const item = base.items.metadata.items.find((v) => v.id === itemID);
        const peerItem = peer.data.inventory?.items.find((v) => v.id === itemID);
        if (peerItem?.id === 32 || peerItem?.id === 18)
            return peer.send(growtopia_js_1.Variant.from("OnTextOverlay", "Cannot trash this item."));
        let dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon(`\`4Trash\`\` ${item?.name}`, item?.id, "big")
            .addTextBox(`How many to \`4destroy\`\`? (you have ${peerItem?.amount})`)
            .addInputBox("trash_count", "", peerItem?.amount, 5)
            .embed("itemID", itemID)
            .endDialog("trash_end", "Cancel", "OK")
            .str();
        peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
    }
}
exports.default = default_1;
