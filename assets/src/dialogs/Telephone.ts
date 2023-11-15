import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Database } from "../database/db";

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "phone"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      number: string;
      //seed_only: string;
    }>
  ): void {
    
    if(action.number === "12345") {
    let dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon("Crazy Jim's Quest Emporium", "3902", "big")
      .addSmallText("HEEEEYYY there Growtopian! I'm Crazy Jim, and my quest are so crazy they're KERRRRAAAAZZY!! And that is clearly very crazy, so please, be cautions around them. What can I do ya for, partner?")
      .addButton("dq", "Daily Quest")
      .addButton("goals", "Goals")
      .addButton("epic_quests", "Epic Quests")
      .endDialog("crazy_jim", "Hang Up", "")
      .str()

      peer.send(Variant.from("OnDialogRequest", dialog));

  }else{
    return peer.send(Variant.from("OnTextOverlay", "Hmmm... wrong number, could'nt reach anyone."))
  }
}
}
