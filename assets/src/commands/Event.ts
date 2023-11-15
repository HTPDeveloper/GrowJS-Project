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
      permission: [Role.BASIC, Role.ADMIN, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 

    let world = peer.hasWorld(peer.data.world);

   peer.everyPeer((p) => {
    peer.send(Variant.from("OnTextOverlay", "`2Starting World Event!"))

    if(p.data.world === peer.data.world){

      p.send(Variant.from("OnAddNotification", "", "`2Beautiful Crystal:`` `wYou have 30 seconds to find and grab the `6Crystal Block Seed."))
    


   world!.drop(peer, p.data.x! / world?.data.playerCount! * 3, p.data.y! / 3, 263, 1)
    //data.set(`onEvent_${peer.data.world}`, true)
    }
   })
  }
}
