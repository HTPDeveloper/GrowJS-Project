import { TextPacket, Variant } from "growtopia.js";
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
      name: "warp",
      description: "Warp to a world, using command.",
      cooldown: 10,
      ratelimit: 1,
      category: "Basic",
      usage: "/warp",
      example: ["/warp <world>"],
      permission: [Role.BASIC, Role.SUPPORTER, Role.DEVELOPER]
    };
  }
  
  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 

    const inapp = ["fuck", "porn", "dick", "pussy", "vargina", "kontol", "memek"]

    if(!args[0]) return peer.send(Variant.from("OnConsoleMessage", "Please mention a world that is vaild."))
    if(args[0].match(/\W+|_|EXIT/gi) || args[0].match("fuck") || args[0].match("porn") || args[0].match("dick") || args[0].match("pussy") || args[0].match("vargina") || args[0].match("kontol") || args[0].match("dick"))
     return peer.send(Variant.from("OnConsoleMessage", "Please mention a world that is vaild."))

    peer.enterWorld(args[0])
   return peer.send(Variant.from("OnConsoleMessage", "Entering world >>> " + args[0] + "..."))
  }
}
