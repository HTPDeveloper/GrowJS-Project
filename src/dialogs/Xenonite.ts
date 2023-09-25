import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Database } from "../database/db";
import { WorldData, WorldDB } from "../types/world";
import { QuickDB } from "quick.db";
const data = new QuickDB

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "xeno_edit"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      strong_hit: string;
    }>
  ): void {
    const hit = parseInt(action.strong_hit) ? true : false;

   
    if(hit){
        peer.send(Variant.from( "OnTalkBubble",
        peer.data.netID, "Xenonite has changed everyone's powers! `2Strong Punch granted`0!"))
        peer.send(Variant.from( "OnConsoleMessage", "Xenonite has changed everyone's powers! `2Strong Punch granted`0!"))
       // db.haveXeno({haveBuff : true})
       data.set(`haveXeno_${peer.data.world}`, true)
    }else{
      data.set(`haveXeno_${peer.data.world}`, false)
    }

    
  }
}
