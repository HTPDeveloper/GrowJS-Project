import { Variant } from "growtopia.js";
import { Peer } from "../structures/Peer";
import { Action } from "../abstracts/Action";
import { BaseServer } from "../structures/BaseServer";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { ActionType } from "../types/action";
import { Database } from "../database/db";
import { QuickDB } from "quick.db";
const data = new QuickDB
import * as fs from 'fs';


export default class extends Action {
  constructor() {
    super();
    this.config = {
      eventName: "enter_game"
    };
  }

  public async handle(base: BaseServer, peer: Peer,db: Database, action: ActionType<{ action: string }>): Promise<void> {
    let filePath = 'number.txt';
    const carnival = await data.get(`Carnival`)
    const GemEvnt = await data.get(`GemEvent`)
    const Gems = await data.get(`GemEventGems`)

fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return;
      }
      //console.log(`File contents of ${filePath}:`);
      //console.log(data);
   


    // Carnival Message
    const tes = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon("Hello", "1000", "big")
      .addSpacer("small")
      .addTextBox("Welcome to GrowServer")
      .raw("add_image_button||interface/large/news_banner.rttex|bannerlayout|||\n")
      .addQuickExit()
      .endDialog("gazzette_end", "Cancel", "Ok")
      .str();
    peer.send(
      Variant.from("OnRequestWorldSelectMenu", "add_filter|\nadd_heading|Top Worlds|\nadd_floater|wotd_world|START|0|0.5|2147418367|"),
      
      Variant.from("OnConsoleMessage", `Welcome! ${peer.name} Where would you like to go? (${data} online)`),
      Variant.from({ delay: 100 }, "OnDialogRequest", tes)
    );
    if(carnival){
      peer.send( 
      Variant.from("OnRequestWorldSelectMenu", "add_filter|\nadd_heading|Top Worlds|\nadd_floater|wotd_world|START|0|0.5|2147418367|"),
      Variant.from("OnConsoleMessage", "`2Carnival has come to town`0, visit the world `9CARNIVAL`0, try your luck at winning one of the ringmaster's fabulous rings!")
      )
    }

    if(GemEvnt){
      peer.send( 
        Variant.from("OnRequestWorldSelectMenu", "add_filter|\nadd_heading|Top Worlds|\nadd_floater|wotd_world|START|0|0.5|2147418367|"),
        Variant.from("OnConsoleMessage", `\`2x${Gems} Gem Event is ongoing, \`5Try get as much gems as you can!`)
        )
    }
  });

    
  }
}
