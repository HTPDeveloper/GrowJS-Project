"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Dialog_1 = require("../abstracts/Dialog");
class default_1 extends Dialog_1.Dialog {
    constructor() {
        super();
        this.config = {
            dialogName: "find_item_end"
        };
    }
    handle(base, peer, db, action) {
        const itemID = parseInt(action.buttonClicked);
        peer.data.inventory?.items.push({ id: itemID, amount: 200 });
        peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", `Added \`6${base.items.metadata.items.find((v) => v.id === itemID)?.name}\`\` to your inventory.`));
        peer.inventory();
        peer.saveToCache();
        // peer.saveToDatabase();
    }
}
exports.default = default_1;
