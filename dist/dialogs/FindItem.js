"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Dialog_1 = require("../abstracts/Dialog");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
class default_1 extends Dialog_1.Dialog {
    constructor() {
        super();
        this.config = {
            dialogName: "find_item"
        };
    }
    handle(base, peer, db, action) {
        const isSeed = parseInt(action.seed_only) ? true : false;
        let dialog = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addQuickExit()
            .addLabelWithIcon("Find the item", "6016", "big")
            .addSpacer("small");
        const items = base.items.metadata.items.filter((v) => v.name?.toLowerCase().includes(action.find_item_name.toLowerCase()));
        items.forEach((item) => {
            if (isSeed) {
                if (item.id % 2 === 1)
                    dialog.addButtonWithIcon(item.id, item.id, item.name, "staticBlueFrame", item.id);
            }
            else {
                if (item.id % 2 === 0)
                    dialog.addButtonWithIcon(item.id, item.id, item.name, "staticBlueFrame", item.id);
            }
        });
        // fix spacing dialog later
        // dialog.addSpacer("big");
        dialog.endDialog("find_item_end", "Cancel", "");
        // console.log(dialog.str());
        peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog.str()));
    }
}
exports.default = default_1;
