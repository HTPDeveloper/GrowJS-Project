"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../abstracts/Action");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
const growtopia_js_1 = require("growtopia.js");
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "store"
        };
    }
    handle(base, peer, db, action) {
        const itemID = parseInt(action.itemID);
        const item = base.items.metadata.items.find((v) => v.id === itemID);
        const peerItem = peer.data.inventory?.items.find((v) => v.id === itemID);
        let dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon("Gem Store", 112, "big") //.addLabelWithIcon(`Drop ${item?.name}`, item?.id!, "big")
            .addButton("lock", "Locks Store")
            .addSpacer("small")
            .addButton("wings", "Wings Store")
            .addSpacer("small")
            .addButton("Title", "Title Store")
            .addSpacer("small")
            .addButton("sitems", "Special Items Store")
            .addSpacer("big")
            .addSmallText("* `9Lock converter`0 *")
            .addButtonWithIcon("dl", 1796, "Diamond Lock")
            .addButtonWithIcon("bgl", 7188, "Blue Gem Lock")
            //.addInputBox("drop_count", "", peerItem?.amount, 5)
            .embed("itemID", itemID)
            //.endDialog("drop_end", "Cancel", "OK")
            .addQuickExit()
            .str();
        peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
    }
}
exports.default = default_1;
