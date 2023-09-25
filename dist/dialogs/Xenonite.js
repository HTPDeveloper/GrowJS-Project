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
            dialogName: "xeno_edit"
        };
    }
    handle(base, peer, db, action) {
        const hit = parseInt(action.strong_hit) ? true : false;
        if (hit) {
            peer.send(growtopia_js_1.Variant.from("OnTalkBubble", peer.data.netID, "Xenonite has changed everyone's powers! `2Strong Punch granted`0!"));
            peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "Xenonite has changed everyone's powers! `2Strong Punch granted`0!"));
            // db.haveXeno({haveBuff : true})
            data.set(`haveXeno_${peer.data.world}`, true);
        }
        else {
            data.set(`haveXeno_${peer.data.world}`, false);
        }
    }
}
exports.default = default_1;
