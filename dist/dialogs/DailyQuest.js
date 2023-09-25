"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Dialog_1 = require("../abstracts/Dialog");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
const quick_db_1 = require("quick.db");
const data = new quick_db_1.QuickDB;
class default_1 extends Dialog_1.Dialog {
    constructor() {
        super();
        this.config = {
            dialogName: "crazy_jim"
        };
    }
    async handle(base, peer, db, action) {
        const dqItem1 = await data.get(`dqItem1`);
        const dqItem2 = await data.get(`dqItem2`);
        const dqCount1 = await data.get(`dqCount1`);
        const dqCount2 = await data.get(`dqCount2`);
        const dqCompleted = await data.get(`dqCompleted`);
        const items = base.items.metadata.items;
        const peerInv = peer.data.inventory?.items;
        const foundItem = items.find((item) => item.id === dqItem1);
        const foundItem2 = items.find((item) => item.id === dqItem2);
        // Vaildation
        const peerHave = peerInv?.find(item => item.id === dqItem1);
        //const amount = peerInv?.find(item => item.amount === dqCount1)
        const peerHave2 = peerInv?.find(item => item.id === dqItem2);
        // const amount2 = peerInv?.find(item => item.amount === dqCount2)
        let i;
        if (peerHave?.amount === undefined && peerHave2?.amount === undefined)
            i = 0;
        if (action.buttonClicked === "dq") {
            let dialog = new DialogBuilder_1.DialogBuilder()
                .defaultColor()
                .addLabelWithIcon("Crazy Jim's Daily Quest", "3902", "big")
                .addSmallText("I guess some people call me Crazy Jim because I'am a bit of a hoarder. But I'm very particular about what I want! And today, what I want is this:")
                .addLabelWithIcon(`\`2${dqCount1} ${foundItem?.name}`, `${dqItem1}`, "small")
                .addSmallText("and")
                .addLabelWithIcon(`\`2${dqCount2} ${foundItem2?.name}`, `${dqItem2}`, "small")
                .addSpacer("small")
                .addSmallText("You shave all that through the phone (It works, I've tried it), and I will hand you one of the `2Growtokens `0from my personal collection! But hurry, this offer is only good until midnight, and only one `2Growtoken `0per person.")
                .addSpacer("small")
                .addSmallText(`\`8(You have ${peerHave?.amount !== undefined ? peerHave.amount : 0} ${foundItem?.name} and ${peerHave2?.amount !== undefined ? peerHave2.amount : 0} ${foundItem2?.name})`);
            if (peerHave?.amount == dqCount1 && peerHave2?.amount == dqCount2 && dqCompleted === false) {
                dialog.addButton("turn_in", "Turn in!");
            }
            if (dqCompleted === true) {
                dialog.addSmallText("`4(You have completed today's Daily Quest task, come back tommorrow)");
            }
            dialog.endDialog("crazy_jims", "Hang Up", "Back");
            //.str()
            peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog.str()));
        }
    }
}
exports.default = default_1;
