import { TankPacket, TextPacket, Variant, TankTypes } from "growtopia.js";
import { Command } from "../abstracts/Command";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { CommandOptions } from "../types/command";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Role } from "../utils/Constants";
import { DataTypes } from "../utils/enums/DataTypes";
import { find } from "../utils/Utils";
import { parseArgs } from "util";

export default class extends Command {
  public opt: CommandOptions;

  constructor() {
    super();
    this.opt = {
      name: "msg",
      description: "msg",
      cooldown: 1,
      ratelimit: 1,
      category: "Basic",
      usage: "/msg",
      example: ["/msg"],
      permission: [Role.BASIC, Role.ADMIN, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
    const targetPeer = find(base, base.cache.users, (user) =>
        user.data.tankIDName.toLowerCase().includes(args[0].toLowerCase())
      );
    
      const cleanedString = args.join(" ").slice(targetPeer?.data.tankIDName.length || 0);

      if(!targetPeer || targetPeer === null) {
        peer.send(Variant.from("OnConsoleMessage", "User not found! (User must be online to use this command.)"));
        return
      } 
      targetPeer.send(Variant.from("OnConsoleMessage", `[MSG] >> from (${peer.name}) in (${peer.data.world}) > ${cleanedString}`));
}
}
