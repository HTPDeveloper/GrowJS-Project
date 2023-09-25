"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../abstracts/Action");
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "dialog_return"
        };
    }
    handle(base, peer, db, action) {
        let name = action.dialog_name;
        try {
            if (!base.dialogs.has(name))
                return;
            base.dialogs.get(name).handle(base, peer, db, action);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = default_1;
