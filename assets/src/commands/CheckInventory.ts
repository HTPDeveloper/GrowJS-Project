import { TextPacket, Variant } from "growtopia.js";
import { Command } from "../abstracts/Command";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { CommandOptions } from "../types/command";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Role } from "../utils/Constants";
import { DataTypes } from "../utils/enums/DataTypes";
import { World } from "../structures/World";
import { QuickDB } from "quick.db";
const data = new QuickDB

export default class extends Command {
  public opt: CommandOptions;

  constructor() {
    super();
    this.opt = {
      name: "inv",
      description: "Start a new world event.",
      cooldown: 0,
      ratelimit: 1,
      category: "Developer",
      usage: "/inventory",
      example: ["/inventory"],
      permission: [Role.MOD, Role.ADMIN, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
    const pInv = peer.data.inventory?.items

    
     const dialog = new DialogBuilder()
     .defaultColor()
     .addLabelWithIcon(`${peer.name}'s inventory`, "32", "small")
     .addSpacer("small")
     .addCustomBreak()
     const transformedArray = pInv!.map((element) => {
      dialog.addButtonWithIcon(element.id!, element.id!, "", "staticBlueFrame", element.amount!)
      });
      dialog.addCustomBreak()
      dialog.endDialog("endInv", "Cancel", "")

      peer.send(Variant.from("OnDialogRequest", dialog.str()));

  }
}
