import { Variant } from "growtopia.js";
import { Peer } from "../structures/Peer";
import { Action } from "../abstracts/Action";
import { BaseServer } from "../structures/BaseServer";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { ActionType } from "../types/action";
import { Database } from "../database/db";
import { QuickDB } from "quick.db";
const data = new QuickDB

export default class extends Action {
  constructor() {
    super();
    this.config = {
      eventName: "enter_game"
    };
  }

  public async handle(base: BaseServer, peer: Peer,db: Database, action: ActionType<{ action: string }>): Promise<void> {
    // Carnival Message
    const carnival = await data.get(`Carnival`)
    const tes = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon("Hello", "1000", "big")
      .addSpacer("small")
      .addTextBox("Welcome to GrowServer")
      .raw("add_image_button||interface/large/news_banner1.rttex|bannerlayout|||\n")
      .addQuickExit()
      .endDialog("gazzette_end", "Cancel", "Ok")
      .str();
    peer.send(
      Variant.from("OnRequestWorldSelectMenu"),
      Variant.from("OnConsoleMessage", `Welcome! ${peer.name} Where would you like to go?`),
      Variant.from({ delay: 100 }, "OnDialogRequest", tes)
    );
    if(carnival){
      peer.send( 
      Variant.from("OnRequestWorldSelectMenu"),
      Variant.from("OnConsoleMessage", "`2Carnival has come to town`0, visit the world `9CARNIVAL`0, try your luck at winning one of the ringmaster's fabulous rings!")
      )
    }
  }
}
