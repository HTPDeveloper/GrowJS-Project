import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Database } from "../database/db";
import { WorldData, WorldDB } from "../types/world";
import { QuickDB } from "quick.db";
import { World } from "../structures/World";
const data = new QuickDB

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "ring_master"
    };
  }

  public async handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
   // world: World, 
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      buttonClicked: string;
    }>
  ): Promise<void> {
    //
    const OnQuest = await data.get(`OnQuest_${peer.data.id_user}`)
    /**
     * Randomiser
     */
    function shuffleArray(array: string[]): string {
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
      function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      // Example: Generate a random number between 1 and 10 (inclusive)
      const randomNum = getRandomInt(1, 200);

    if(action.buttonClicked === "ring_masters"){
        console.log("Clicked!")
       const items = peer.data.inventory?.items

       if (items) {
        //const itemNameToFind = 'SpecificItemName'; // Replace with the name of the item you want to find
      
        const foundItem = items.find(item => item.id === 1898);
        const amount = items.find(item => item.amount === 10)

        if(foundItem && amount) { 
        const dialog = new DialogBuilder()
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
        .str()

        peer.send(Variant.from("OnDialogRequest", dialog));

        data.set(`OnQuest_${peer.data.id_user}`, true)
        data.set(`Item_${peer.data.id_user}`, `${randomItem}`)
        data.set(`Count_${peer.data.id_user}`, `${randomNum}`)
        
        }
        
      
    }
     
    }
    
  }
}
