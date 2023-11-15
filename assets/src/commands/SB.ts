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
      name: "sb",
      description: "Super broadcast to players online.",
      cooldown: 10,
      ratelimit: 1,
      category: "Basic",
      usage: "/sb",
      example: ["/sb"],
      permission: [Role.BASIC, Role.MOD, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
    let gemsLeft = peer.data.gems - 1000
    const broadcastMessage = args.join(" ");

  
    if(peer.data.gems < 1000) return peer.send(Variant.from("OnConsoleMessage", "Could'nt broadcast, not enough gems."))

    if(!args[0]) return peer.send(Variant.from("OnConsoleMessage", "Could'nt broadcast, try again with interesting words."))

    peer.everyPeer((p) => {
      p.send(Variant.from("OnConsoleMessage", `** \`pSuper-Broadcast \`0from ${peer.data.tankIDName} (in \`o${peer.data.world}\`0) **: \`#${broadcastMessage}`));

      
    })
    peer.send(Variant.from("OnSetBux", parseInt(`${gemsLeft}`)));
        peer.data.gems = parseInt(`${gemsLeft}`);
        peer.saveToCache();
        peer.saveToDatabase();
  }
}
