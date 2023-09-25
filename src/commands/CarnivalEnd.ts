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
      name: "endcarnival",
      description: "Close Carnival.",
      cooldown: 0,
      ratelimit: 1,
      category: "Basic",
      usage: "/endcarnival",
      example: ["/endcarnival"],
      permission: [Role.BASIC, Role.SUPPORTER, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
   peer.everyPeer((p) => {
    p.send(Variant.from("OnConsoleMessage", "`2Carnival has left to town`0, The Ringmaster will be back in afew days."))
   data.set(`Carnival`, false)
   })
  }
}
