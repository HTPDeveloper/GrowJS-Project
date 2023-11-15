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
      dialogName: "lock_edit"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      playerNetID: number;
    }>
  ): void {
    const world = peer.hasWorld(peer.data.world);
    const newAdminsArray: number[] = [action.playerNetID];

    if (action.playerNetID) {
      if (action.playerNetID === peer.data.netID) {
        return peer.send(Variant.from("OnTalkBubble", "You already have access!"));
      }

      const data = world?.data;

      // Assign the admins property to the variable
      data!.admins = newAdminsArray;

      //world?.saveToDatabase(); // Save the world to the database

      // Send a chat message to notify the player
      peer.send(Variant.from("OnConsoleMessage", "New admin added!"));
    }
  }
}