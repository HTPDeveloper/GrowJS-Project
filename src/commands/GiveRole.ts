import { TankPacket, TextPacket, Variant, TankTypes } from "growtopia.js";
import { Command } from "../abstracts/Command";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { CommandOptions } from "../types/command";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Role } from "../utils/Constants";
import { DataTypes } from "../utils/enums/DataTypes";
import { find } from "../utils/Utils";
import { Database } from "../database/db";
import { QuickDB } from "quick.db";
const data = new QuickDB

export default class extends Command {
  public opt: CommandOptions;

  constructor() {
    super();
    this.opt = {
      name: "role",
      description: "Role giver",
      cooldown: 0,
      ratelimit: 1,
      category: "Basic",
      usage: "/role",
      example: ["/role <player role>"],
      permission: [Role.BASIC, Role.ADMIN, Role.MOD,  Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[], db: Database): Promise<void> { 
    const targetPeer = find(base, base.cache.users, (user) =>
        user.data.tankIDName.toLowerCase().includes(args[0].toLowerCase())
      );

      if(!args[1]) return peer.send(Variant.from("OnConsoleMessage", "Invalid argument."));
      if(parseInt(args[1]) > 4) return peer.send(Variant.from("OnConsoleMessage", "Role is 1,2,3,4"));

      if(!targetPeer) {
        peer.send(Variant.from("OnConsoleMessage", "User not found! (User must be online to use this command.)"));
        return
      }
      let role: string = "";

      if(args[1] === "1") role = Role.DEVELOPER
      if(args[1] === "2") role = Role.BASIC
      if(args[1] === "3") role = Role.MOD
      if(args[1] === "4") role = Role.ADMIN

     //data.set(`Role_${targetPeer.name}`, role)
     db.updateRole(targetPeer.data.tankIDName, role)
     
      targetPeer.data.role = role;
      targetPeer.send(Variant.from("OnConsoleMessage", `[ROLE] >> from (${peer.name}) in (${peer.data.world}) > ` + args[1]));
       
      targetPeer.send(Variant.from("OnTextOverlay", "`4Please wait... saving data and setting role..."))
      targetPeer.saveToCache()
      targetPeer.saveToDatabase().then(() => {
        targetPeer.send(Variant.from("OnTextOverlay", "`2Received`` " + role + "role!"))
      })
    
  }
}
