import { TankPacket, TextPacket, Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { tileUpdate } from "../tanks/BlockPlacing";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { DataTypes } from "../utils/enums/DataTypes";
import { TankTypes } from "../utils/enums/TankTypes";
import { Database } from "../database/db";
import { World } from "../structures/World";

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "FriendsDialog"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      buttonClicked: string;
    }>
  ): void {
    if(action.buttonClicked === "CG"){ 
   const dialog1 = new DialogBuilder()
   .defaultColor()
   .addLabelWithIcon("GrowAsia Guild Creation", 5814, "big")
   .addSmallText("[`4BETA``] To create guild, fill all the empty fields.")
   .addSmallText("`4Disclaimer``: Guild creation is currently in beta.")
   .addSmallText("`4Inappropriate guild creation will result in a ban.")
   .addSpacer("small")
   .addInputBox("guild_name", "Guild Name:", "", 10)
   .addSpacer("small")
   .addInputBox("guild_statement", "Guild Statement:", "", 30)
   .addSpacer("small")
   .addButton("create", "Create!")
   .endDialog("CGDialog", "", "Close")
   .addQuickExit()
   //.str();

   peer.send(Variant.from("OnDialogRequest", dialog1.str()));
  }
}
}