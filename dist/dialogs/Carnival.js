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
            dialogName: "ring_master"
        };
    }
    async handle(base, peer, db, action) {
        //
        const OnQuest = await data.get(`OnQuest_${peer.data.id_user}`);
        /**
         * Randomiser
         */
        function shuffleArray(array) {
            const shuffledArray = [...array];
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray[0]; // Return the first (random) item
        }
        // Example usage:
        const deliverItems = ["Dirts", "World Locks", "Fire Escape", "Buffalo", "Diamond Wings", "Blazing Electro Wings", "Diamond Diaper"];
        const randomItem = shuffleArray(deliverItems);
        //console.log(randomItem); // Log the randomly selected item
        /**Random num */
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        // Example: Generate a random number between 1 and 10 (inclusive)
        const randomNum = getRandomInt(1, 200);
        if (action.buttonClicked === "ring_masters") {
            console.log("Clicked!");
            const items = peer.data.inventory?.items;
            if (items) {
                //const itemNameToFind = 'SpecificItemName'; // Replace with the name of the item you want to find
                const foundItem = items.find(item => item.id === 1898);
                const amount = items.find(item => item.amount === 10);
                if (foundItem && amount) {
                    const dialog = new DialogBuilder_1.DialogBuilder()
                        .defaultColor()
                        .addLabelWithIcon(`\`9Quest For The Ring`, 1900, "big")
                        .addSmallText(`(Step 1/1)`)
                        .addSpacer("small")
                        .addSmallText(`Your task is to bring me ${randomNum} of them ${randomItem} things!`)
                        .addSpacer("small")
                        .addSmallText(`(Current progress 0/${randomNum})`)
                        .addButton("deliver", `\`9Deliver ${randomNum} ${randomItem}`)
                        .addButton("giveup", "\`9Give up this quest")
                        .addSpacer("small")
                        .addSmallText("If you had 10 rings of the same type maybe we could have made a deal...")
                        .addSpacer("small")
                        .endDialog("noob", "Goodbye", "")
                        .str();
                    peer.send(growtopia_js_1.Variant.from("OnDialogRequest", dialog));
                    data.set(`OnQuest_${peer.data.id_user}`, true);
                    data.set(`Item_${peer.data.id_user}`, `${randomItem}`);
                    data.set(`Count_${peer.data.id_user}`, `${randomNum}`);
                }
            }
        }
    }
}
exports.default = default_1;
