import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Database } from "../database/db";
import { ItemsDat } from "itemsdat";
import { QuickDB } from "quick.db";
const data = new QuickDB

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "crazy_jims"
    };
  }

  public async handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      number: string;
      //seed_only: string;
      buttonClicked: string;
    }>
  ): Promise<void> {

    if(action.buttonClicked === "turn_in"){
        peer.send(Variant.from("OnAddNotification", peer.data.netID, "Received 1 `2Growtoken`0!"))

        peer.addItemInven(1486, 1)
        peer.inventory()
        peer.saveToCache()

        data.set(`dqCompleted`, true)
    }
}
}
