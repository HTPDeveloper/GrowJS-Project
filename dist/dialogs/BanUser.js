"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Dialog_1 = require("../abstracts/Dialog");
class default_1 extends Dialog_1.Dialog {
    constructor() {
        super();
        this.config = {
            dialogName: "ban_user"
        };
    }
    handle(base, peer, db, action) {
        if (!action.time)
            return peer.send(growtopia_js_1.Variant.from("OnTextOverlay", "Could not specify time of ban."));
        if (!action.reason)
            return peer.send(growtopia_js_1.Variant.from("OnTextOverlay", "Could not specify time of ban."));
        //if(!action.buttonClicked) return;
        if (action.buttonClicked === "ban_users") {
            peer.send(growtopia_js_1.Variant.from("OnAddNotification", "", "Warning from `4System`0: You've been `4BANNED `0from GrowJS for " + action.time + "days."));
            //peer.disconnect()
            peer.data.clothing?.mask == 408;
            peer.sendClothes();
        }
        else {
            return;
        }
    }
}
exports.default = default_1;
