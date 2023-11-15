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
      name: "gemevent",
      description: "Free gems!",
      cooldown: 0,
      ratelimit: 1,
      category: "Developer",
      usage: "/gemevent",
      example: ["/gemevent"],
      permission: [Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
    const GemEvnt = await data.get(`GemEvent`)

    if(!args[0]) return peer.send(Variant.from("OnConsoleMessage", "Please enter a number!"))
    if(GemEvnt) return peer.send(Variant.from("OnConsoleMessage", "Event has already started! `bEnd the event to start a new one!"))

   peer.everyPeer((p) => {
    p.send(Variant.from("OnConsoleMessage", `x${args[0]} \`2Gem Event has began! \`9Happy farming everyone!`))
    p.send(Variant.from("OnAddNotification", "interface/atomic_button.rttex" ,`x${args[0]} \`2Gem Event has began!\``, "audio/hub_open.wav"))
   data.set(`GemEvent`, true)
   data.set(`GemEventGems`, parseInt(args[0]))
   })
  }
}
