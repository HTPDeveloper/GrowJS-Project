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
      dialogName: "register_end"
    };
  }

  public async handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      register_name: string;
      register_password: string;
    }>
  ): Promise<void> {
    
    let checkuser = await db.getUser(action.register_name) 

    if(action.register_name.length < 3 || null){
      return peer.send(Variant.from("OnConsoleMessage", "`4GrowID: Too short"))
    } else if(action.register_password.length < 3 || null){
      return peer.send(Variant.from("OnConsoleMessage", "`4Password: Too short"))
    }else if(checkuser?.name.toLocaleLowerCase(action.register_name)){
      console.log('checkuser?.name:', checkuser?.name);
      console.log('action.register_name:', action.register_name);
      
      return peer.send(Variant.from("OnConsoleMessage", "`4GrowID: Already registered"))
    }else{ 





    db.createUser(action.register_name, action.register_password)
   return peer.send(Variant.from("OnConsoleMessage", "`2Successfully registered! Re-log required."))
    }
  }
}
