import { Action } from "../abstracts/Action";
import { Peer } from "../structures/Peer";
import { BaseServer } from "../structures/BaseServer";
import { ActionType } from "../types/action";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Variant } from "growtopia.js";
import { Database } from "../database/db";
import e from "express";
import { Z_UNKNOWN } from "zlib";

export default class extends Action {
  constructor() {
    super();
    this.config = {
      eventName: "friends"
    };
  }

  public async handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: ActionType<{ action: string; delay: number, netID: string, tankIDName: string }>
  ): Promise<void> { 
    //let getGuild = await db.getGuild(undefined as any, peer.data.tankIDName);
    let dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon("Social Portal", "1366", "big")
      .addButton("friendsList", "Show Friends")
     // if(getGuild){
    //  dialog.addButton("GM", "Show Guild Members(`2Coming soon!`0)")
   //  dialog.addButton("GC", "Guild Challenge(`2Coming soon!`0)")
    //  dialog.addButton("top_players", "Show `9Top Players(`2Coming soon!`0)")
   //   }else {
        .addButton("CG", "Create Guild")
   //   }
      .addButton("top_players", "Show `9Top Players(`2Coming soon!`0)")
      .endDialog("FriendsDialog", "Close", "")
      .addQuickExit()
      //.str();

    peer.send(Variant.from({ delay: 100 }, "OnDialogRequest", dialog.str()));
  }
}
