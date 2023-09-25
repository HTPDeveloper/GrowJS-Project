"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dialog_1 = require("../abstracts/Dialog");
class default_1 extends Dialog_1.Dialog {
    constructor() {
        super();
        this.config = {
            dialogName: "trash_end"
        };
    }
    handle(base, peer, db, action) {
        const itemID = parseInt(action.itemID);
        let invenItem = peer.data.inventory?.items.find((item) => item.id === itemID);
        if (!/\d/.test(action.trash_count))
            return;
        const count = parseInt(action.trash_count);
        invenItem.amount = invenItem.amount - count;
        // Check if inventory amount is empty, then delete it.
        if (invenItem.amount <= 0) {
            peer.data.inventory.items = peer.data.inventory?.items.filter((i) => i.amount !== 0);
        }
        peer.saveToCache();
        peer.inventory();
    }
}
exports.default = default_1;
