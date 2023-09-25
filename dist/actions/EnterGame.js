"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Action_1 = require("../abstracts/Action");
const DialogBuilder_1 = require("../utils/builders/DialogBuilder");
const quick_db_1 = require("quick.db");
const data = new quick_db_1.QuickDB;
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "enter_game"
        };
    }
    async handle(base, peer, db, action) {
        // Carnival Message
        const carnival = await data.get(`Carnival`);
        const tes = new DialogBuilder_1.DialogBuilder()
            .defaultColor()
            .addLabelWithIcon("Hello", "1000", "big")
            .addSpacer("small")
            .addTextBox("Welcome to GrowServer")
            .raw("add_image_button||interface/large/news_banner1.rttex|bannerlayout|||\n")
            .addQuickExit()
            .endDialog("gazzette_end", "Cancel", "Ok")
            .str();
        peer.send(growtopia_js_1.Variant.from("OnRequestWorldSelectMenu"), growtopia_js_1.Variant.from("OnConsoleMessage", `Welcome! ${peer.name} Where would you like to go?`), growtopia_js_1.Variant.from({ delay: 100 }, "OnDialogRequest", tes));
        if (carnival) {
            peer.send(growtopia_js_1.Variant.from("OnRequestWorldSelectMenu"), growtopia_js_1.Variant.from("OnConsoleMessage", "`2Carnival has come to town`0, visit the world `9CARNIVAL`0, try your luck at winning one of the ringmaster's fabulous rings!"));
        }
    }
}
exports.default = default_1;
