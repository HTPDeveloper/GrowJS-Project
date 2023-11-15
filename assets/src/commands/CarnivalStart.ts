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
      name: "startcarnival",
      description: "Open Carnival.",
      cooldown: 0,
      ratelimit: 1,
      category: "Basic",
      usage: "/startcarnival",
      example: ["/startcarnival"],
      permission: [Role.BASIC, Role.ADMIN, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
   peer.everyPeer((p) => {
    p.send(Variant.from("OnConsoleMessage", "`2Carnival has come to town`0, visit the world `9CARNIVAL`0, try your luck at winning one of the ringmaster's fabulous rings!"))
   data.set(`Carnival`, true)
   })
  }
}
