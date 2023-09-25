"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const quick_db_1 = require("quick.db");
const data = new quick_db_1.QuickDB;
class Dialog {
    constructor() {
        this.config = {
            dialogName: undefined
        };
    }
    handle(base, peer, db, action) { }
}
exports.Dialog = Dialog;
