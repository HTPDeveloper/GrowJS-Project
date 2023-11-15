import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Database } from "../database/db";
import { ItemsDat } from "itemsdat";
import { QuickDB } from "quick.db";
import { World } from "../structures/World";
const data = new QuickDB

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "crazy_jim"
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
      number: string;
      //seed_only: string;
      buttonClicked: string;
    }>
  ): Promise<void> {

    const dqItem1 = await data.get(`dqItem1`)
    const dqItem2 = await data.get(`dqItem2`)
    const dqCount1 = await data.get(`dqCount1`)
    const dqCount2 = await data.get(`dqCount2`)
    const dqCompleted = await data.get(`dqCompleted`)

    const items = base.items.metadata.items
    const peerInv = peer.data.inventory?.items

      const foundItem = items.find((item) => item.id === dqItem1);
      const foundItem2 = items.find((item) => item.id === dqItem2);
      // Vaildation
      const peerHave = peerInv?.find(item => item.id === dqItem1);
      //const amount = peerInv?.find(item => item.amount === dqCount1)

      const peerHave2 = peerInv?.find(item => item.id === dqItem2);
     // const amount2 = peerInv?.find(item => item.amount === dqCount2)

      let i;
      if(peerHave?.amount === undefined && peerHave2?.amount === undefined) i = 0

    
    if(action.buttonClicked === "dq") {
    let dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon("Crazy Jim's Daily Quest", "3902", "big")
      .addSmallText("I guess some people call me Crazy Jim because I'am a bit of a hoarder. But I'm very particular about what I want! And today, what I want is this:")
      .addLabelWithIcon(`\`2${dqCount1} ${foundItem?.name}`, `${dqItem1}`, "small")
      .addSmallText("and")
      .addLabelWithIcon(`\`2${dqCount2} ${foundItem2?.name}`, `${dqItem2}`, "small")
      .addSpacer("small")
      .addSmallText("You shave all that through the phone (It works, I've tried it), and I will hand you one of the `2Growtokens `0from my personal collection! But hurry, this offer is only good until midnight, and only one `2Growtoken `0per person.")
      .addSpacer("small")
      .addSmallText(`\`8(You have ${peerHave?.amount !== undefined ? peerHave.amount : 0} ${foundItem?.name} and ${peerHave2?.amount !== undefined ? peerHave2.amount : 0} ${foundItem2?.name})`)

      if(peerHave?.amount! == dqCount1 && peerHave2?.amount == dqCount2 && dqCompleted === false){
        dialog.addButton("turn_in", "Turn in!")
      }
      if(dqCompleted === true){
          dialog.addSmallText("`4(You have completed today's Daily Quest task, come back tommorrow)")
      }

      dialog.endDialog("crazy_jims", "Hang Up", "Back")
      //.str()

      peer.send(Variant.from("OnDialogRequest", dialog.str()));

      

    

  }
}
}
