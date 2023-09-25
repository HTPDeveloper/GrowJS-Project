"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const growtopia_js_1 = require("growtopia.js");
const Action_1 = require("../abstracts/Action");
const TankTypes_1 = require("../utils/enums/TankTypes");
class default_1 extends Action_1.Action {
    constructor() {
        super();
        this.config = {
            eventName: "refresh_item_data"
        };
    }
    handle(base, peer, db, action) {
        peer.send(growtopia_js_1.Variant.from("OnConsoleMessage", "One moment. Updating item data..."), growtopia_js_1.TankPacket.from({ type: TankTypes_1.TankTypes.PEER_ITEMS_DAT, data: () => base.items.content }));
    }
}
exports.default = default_1;
