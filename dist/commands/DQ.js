"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Command_1 = require("../abstracts/Command");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
const Constants_1 = require("../utils/Constants");
const quick_db_1 = require("quick.db");
const data = new quick_db_1.QuickDB;
class default_1 extends Command_1.Command {
    constructor() {
        super();
        this.opt = {
            name: "dq",
            description: "Change daily quest deliver items",
            cooldown: 0,
            ratelimit: 1,
            category: "Basic",
            usage: "/dq",
            example: ["/dq "],
            permission: [Constants_1.Role.BASIC, Constants_1.Role.SUPPORTER, Constants_1.Role.DEVELOPER]
        };
    }
    async execute(base, peer, text, args) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        // Example: Generate a random number between 1 and 10 (inclusive)
        const randomNum = getRandomInt(4, 1005);
        function getRandomInt1(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        // Example: Generate a random number between 1 and 10 (inclusive)
        const randomNum2 = getRandomInt1(4, 1005);
        const items = base.items.metadata.items;
        const foundItem = items.find((item) => item.id === randomNum);
        const foundItem2 = items.find((item) => item.id === randomNum2);
        function getRandomInt3(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        // Example: Generate a random number between 1 and 10 (inclusive)
        const randomNum3 = getRandomInt3(1, 150);
        function getRandomInt4(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        // Example: Generate a random number between 1 and 10 (inclusive)
        const randomNum4 = getRandomInt4(1, 150);
        peer.everyPeer((p) => {
            const dialog = new DialogBuilder_1.DialogBuilder()
                .defaultColor()
                .addLabelWithIcon("Today's Daily Quest", 3902, "big")
                .addSpacer("small")
                .addLabelWithIcon(`<- Deliver ${randomNum3} \`2${foundItem?.name}`, randomNum, "small")
                .addSmallText("And")
                .addLabelWithIcon(`<- Deliver ${randomNum4} \`2${foundItem2?.name}`, randomNum2, "small")
                .addQuickExit()
                .str();
            p.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
            p.send(growtopia_js_1.Variant.from("OnConsoleMessage", "`2New Daily Quest for today`0, `9Check with Crazy Jim for items to deliver and get a reward of 1 Growtoken!"));
            data.set(`dqItem1`, randomNum);
            data.set(`dqItem2`, randomNum2);
            data.set(`dqCount1`, randomNum3);
            data.set(`dqCount2`, randomNum4);
            // remove those who have dqCompleted on
            data.set(`dqCompleted`, false);
        });
    }
}
exports.default = default_1;
