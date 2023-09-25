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
      name: "event",
      description: "Start a new world event.",
      cooldown: 0,
      ratelimit: 1,
      category: "Basic",
      usage: "/event",
      example: ["/event"],
      permission: [Role.BASIC, Role.SUPPORTER, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
   peer.everyPeer((p) => {
    p.send(Variant.from("OnTextOverlay", "`2Starting Event...!"))
    data.set(`onEvent_${peer.data.world}`, true)
   })
  }
}
