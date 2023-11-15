import { TankPacket, TextPacket, Variant, TankTypes } from "growtopia.js";
import { Command } from "../abstracts/Command";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { CommandOptions } from "../types/command";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Role } from "../utils/Constants";
import { DataTypes } from "../utils/enums/DataTypes";
import { find } from "../utils/Utils";
import { QuickDB } from "quick.db";
const data = new QuickDB

export default class extends Command {
  public opt: CommandOptions;

  constructor() {
    super();
    this.opt = {
      name: "addfriend",
      description: "Add friend",
      cooldown: 0,
      ratelimit: 1,
      category: "Basic",
      usage: "/addfriend",
      example: ["/addfriend <player name>"],
      permission: [Role.BASIC, Role.ADMIN, Role.MOD,  Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 
    const targetPeers = find(base, base.cache.users, (user) =>
      user.data.tankIDName.toLowerCase().includes(args[0].toLowerCase())
      );
      const targetPeer = {
        data: {
          tankIDName: targetPeers?.data.tankIDName,
          // Other properties of targetPeer
        },
      };

      

      if(!targetPeers) return peer.send(Variant.from("OnConsoleMessage", "User not found! (User must be online to use this command.)"));
      
      // Fetch the array from the database
      const existingArray: any[] = await data.get(`Friend_${targetPeer.data.tankIDName}`) || [];
      
      // Add an element (in this case, targetPeer) to the array
      existingArray.push(targetPeer);
      
      // Set the modified array back in the database

      peer.send(Variant.from("OnTalkBuble", `Waiting for ${targetPeer.data.tankIDName} to accept the friend request...`));

      
      data.set(`Friend_${targetPeer.data.tankIDName}`, existingArray);

      const tankIDName = targetPeer.data.tankIDName;
console.log(tankIDName);
      
  }
}
