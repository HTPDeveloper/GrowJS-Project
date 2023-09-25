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
            dialogName: "noob"
        };
    }
    async handle(base, peer, db, action) {
        //const items = peer.data.inventory?.items
        if (action.buttonClicked === "deliver") {
            const items = peer.data.inventory?.items;
            const DataItem = await data.get(`Item_${peer.data.id_user}`);
            console.log(DataItem);
            const Count = await data.get(`Count_${peer.data.id_user}`);
            console.log(Count);
            let i;
            if (DataItem === "Dirts")
                i = 2;
            if (DataItem === "World Locks")
                i = 242;
            if (DataItem === "Fire Escape")
                i = 998;
            if (DataItem === "Buffalo")
                i = 1044;
            if (DataItem === "Diamond Wings")
                i = 1938;
            if (DataItem === "Blazing Electro Wings")
                i = 1936;
            if (DataItem === "Diamond Diaper")
                i = 1944;
            // Vaild Data
            const foundItem = items?.find(item => item.id === i);
            const amount = items?.find(item => item.amount === Count);
            if (!foundItem && !amount) {
                return peer.send(growtopia_js_1.Variant.from("OnTextOverlay", "Get to work!"));
            }
            /// if(foundItem && amount){
            // Reward
            function shuffleArray(array) {
                const shuffledArray = [...array];
                for (let i = shuffledArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
                }
                return shuffledArray[0]; // Return the first (random) item
            }
            // Example usage:
            const deliverItems = ["Gemini Ring", "Ring Of Winds", "Ring Of Force", "Ring Of Water"];
            const randomItem = shuffleArray(deliverItems);
            console.log(randomItem);
            let ok;
            if (randomItem === "Gemini Ring")
                ok = 1986;
            if (randomItem === "Ring Of Winds")
                ok = 1876;
            if (randomItem === "Ring Of Force")
                ok = 1874;
            if (randomItem === "Ring Of Water")
                ok = 2970;
            data.set(`OnQuest_${peer.data.id_user}`, false);
            peer.send(growtopia_js_1.Variant.from("OnAddNotification", 200, "Congratulations! You got " + randomItem));
            //peer.data.inventory?.items.push({ id: i!, amount: Count });
            peer.addItemInven(ok, 1);
            //peer.sendClothes()
            peer.inventory();
            peer.saveToCache();
            //}
        }
        if (action.buttonClicked === "giveup") {
            data.set(`OnQuest_${peer.data.id_user}`, false);
        }
        //peer.send(Variant.from("OnTextOverlay", "Goodbye!"))
    }
}
exports.default = default_1;
