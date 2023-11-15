import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { parseAction } from "../utils/Utils";
import { Database } from "../database/db";
import { World } from "../structures/World";
import { QuickDB } from "quick.db";
const data = new QuickDB

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "FriendsDialog"
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
      find_item_name: string;
      seed_only: string;
      time: string;
      reason: string;
      buttonClicked: string;
      targetPeer: Peer;
    }>
  ): Promise<void> {//OnAddNotification
    const friends = await data.get(`Friend_${peer.data.tankIDName}`) || [];
    

    if(action.buttonClicked === "friendsList"){ 

      if (Array.isArray(friends)) {
        const numberOfFriends = friends.length;

        let g;

        if(numberOfFriends < 1 || !numberOfFriends) g = 0
        
        
    const dialog = new DialogBuilder()
    .defaultColor()
    .addLabelWithIcon(`0 of ${numberOfFriends || g} Friends Online`, "1366", "big")
    .endDialog("close", "", "Close")
    .addSpacer("big")
    if (Array.isArray(friends)) {
      for (const friend of friends) {
        const friendTankIDName = friend.data.tankIDName;
         const targetPeer = base.cache.users.findPeer((p) => p.data.tankIDName === friendTankIDName);
        

         if(targetPeer){
       // console.log(friendTankIDName);
       dialog.addButton(friendTankIDName, `${friendTankIDName} (Status: \`2Online\`0)`);
         }
        // Do something with the friend data
      }
    } else {
      dialog.addSmallText("Such a lonely person, get a friend by doing /addfriend <player name>.")
    }
    dialog.addSpacer("big")
    dialog.addQuickExit()
    dialog.addButton("friends_settings", "Friends Settings")
    dialog.addButton("offline", "Show offline")
    dialog.endDialog("Friends1", "", "Close")

    peer.send(Variant.from({ delay: 100 }, "OnDialogRequest", dialog.str()));
    
  }
}
}
}
