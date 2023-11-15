import { TextPacket, Variant } from "growtopia.js";
import { Command } from "../abstracts/Command";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { CommandOptions } from "../types/command";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Role } from "../utils/Constants";
import { DataTypes } from "../utils/enums/DataTypes";
import { find } from "../utils/Utils";

export default class extends Command {
    public opt: CommandOptions;

  constructor() {
    super();
    this.opt = {
      name: "trade",
      description: "Warp to a world, using command.",
      cooldown: 1,
      ratelimit: 1,
      category: "Basic",
      usage: "/trade",
      example: ["/trade <player>"],
      permission: [Role.BASIC, Role.MOD, Role.DEVELOPER]
    };
  }
  
  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> {

    const world = peer.hasWorld(peer.data.world);
    const targetPeer = find(base, base.cache.users, (user) =>
        user.data.tankIDName.toLowerCase().includes(args[0].toLowerCase())
      );

    

    // Check for arguments
    if (!args[0] || !targetPeer) return peer.send(Variant.from("OnConsoleMessage", "Player not found. Try again with a vaid name."));
    if(!world) return peer.send(Variant.from("OnConsoleMessage", "You must be in a world to use this command."))
   // if(peer.data.world === targetPeer.data.world) return peer.send(Variant.from("OnConsoleMessage", "Hmm... something went wrong, could not find the player in the current world."))

    peer.send(Variant.from("OnTextOverlay", "Sending trade request to " + targetPeer.name + "..."))
    peer.send(Variant.from("OnStartTrade", targetPeer.data.tankIDName, targetPeer.data.netID))
    
  }
}
