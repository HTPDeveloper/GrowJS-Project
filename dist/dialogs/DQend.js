"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Dialog_1 = require("../abstracts/Dialog");
const quick_db_1 = require("quick.db");
const data = new quick_db_1.QuickDB;
class default_1 extends Dialog_1.Dialog {
    constructor() {
        super();
        this.config = {
            dialogName: "crazy_jims"
        };
    }
    async handle(base, peer, db, action) {
        if (action.buttonClicked === "turn_in") {
            peer.send(growtopia_js_1.Variant.from("OnAddNotification", peer.data.netID, "Received 1 `2Growtoken`0!"));
            peer.addItemInven(1486, 1);
            peer.inventory();
            peer.saveToCache();
            data.set(`dqCompleted`, true);
        }
    }
}
exports.default = default_1;
