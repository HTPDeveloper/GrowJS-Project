import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { parseAction } from "../utils/Utils";
import { Database } from "../database/db";
import { World } from "../structures/World";

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "ban_user"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
   // world: World, 
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      find_item_name: string;
      seed_only: string;
      time: string;
      reason: string;
      buttonClicked: string;
      targetPeer: Peer;
    }>
  ): void {//OnAddNotification
    
    
    if(!action.time) return peer.send(Variant.from("OnTextOverlay", "Could not specify time of ban."))
    if(!action.reason) return peer.send(Variant.from("OnTextOverlay", "Could not specify time of ban."))
    //if(!action.buttonClicked) return;
    
    if(action.buttonClicked === "ban_users"){ 
    peer.send(Variant.from("OnAddNotification", "", "Warning from `4System`0: You've been `4BANNED `0from GrowJS for " + action.time + "days."))
    //peer.disconnect()
    peer.data.clothing?.mask == 408
    peer.sendClothes()

    }else{
      return;
    }
    
  }
}
