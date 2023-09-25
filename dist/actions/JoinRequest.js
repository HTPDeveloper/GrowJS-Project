"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Action_1 = require("../abstracts/Action");
const quick_db_1 = require("quick.db");
const data = new quick_db_1.QuickDB;
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "join_request"
        };
    }
    async handle(base, peer, db, action) {
        const worldName = action.name || "";
        if (worldName.length <= 0) {
            return peer.send(growtopia_js_1.Variant.from("OnFailedToEnterWorld", 1), growtopia_js_1.Variant.from("OnConsoleMessage", "That world name is uhh `9empty``"));
        }
        if (worldName.match(/\W+|_|EXIT/gi)) {
            return peer.send(growtopia_js_1.Variant.from("OnFailedToEnterWorld", 1), growtopia_js_1.Variant.from("OnConsoleMessage", "That world name is too `9special`` to be entered."));
        }
        setTimeout(() => {
            peer.enterWorld(worldName.toUpperCase());
        }, 300);
    }
}
exports.default = default_1;
