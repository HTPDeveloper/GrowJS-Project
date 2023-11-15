import { TankPacket, TextPacket, Variant, TankTypes } from "growtopia.js";
import { Command } from "../abstracts/Command";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { CommandOptions } from "../types/command";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Role } from "../utils/Constants";
import { DataTypes } from "../utils/enums/DataTypes";

export default class extends Command {
  public opt: CommandOptions;

  constructor() {
    super();
    this.opt = {
      name: "cry",
      description: "Cry",
      cooldown: 0,
      ratelimit: 1,
      category: "Basic",
      usage: "/cry",
      example: ["/cry"],
      permission: [Role.BASIC, Role.ADMIN, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
    peer.send(Variant.from("OnTalkBubble", peer.data.netID, ":'("));

  }
}
