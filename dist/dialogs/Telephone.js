"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Dialog_1 = require("../abstracts/Dialog");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
class default_1 extends Dialog_1.Dialog {
    constructor() {
        super();
        this.config = {
            dialogName: "phone"
        };
    }
    handle(base, peer, db, action) {
        if (action.number === "12345") {
            let dialog = new DialogBuilder_1.DialogBuilder()
                .defaultColor()
                .addLabelWithIcon("Crazy Jim's Quest Emporium", "3902", "big")
                .addSmallText("HEEEEYYY there Growtopian! I'm Crazy Jim, and my quest are so crazy they're KERRRRAAAAZZY!! And that is clearly very crazy, so please, be cautions around them. What can I do ya for, partner?")
                .addButton("dq", "Daily Quest")
                .addButton("goals", "Goals")
                .addButton("epic_quests", "Epic Quests")
                .endDialog("crazy_jim", "Hang Up", "")
                .str();
            peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
        }
        else {
            return peer.send(growtopia_js_1.Variant.from("OnTextOverlay", "Hmmm... wrong number, could'nt reach anyone."));
        }
    }
}
exports.default = default_1;
