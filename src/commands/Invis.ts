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
                name: "invis",
                description: "Super broadcast to players online.",
                cooldown: 10,
                ratelimit: 1,
                category: "Basic",
                usage: "/invis",
                example: ["/invis"],
                permission: [Role.BASIC, Role.SUPPORTER, Role.DEVELOPER]
              };
            }
          
            public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> {
            TankTypes.SET_CHARACTER_STATE 
            
              peer.send(Variant.from(
                { delay: -1 },
                "OnSpawn",
                "spawn|avatar\n" +
                  `netID|${peer.data.netID}\n` +
                  `userID|${peer.data.id_user}\n` +
                  `colrect|0|0|20|30\n` +
                  `posXY|${peer.data.x}|${peer.data.y}\n` +
                  `name|\`w${peer.name}\`\`\n` +
                  `country|${peer.data.country}\n` +
                  "invis|1\n" +
                  "mstate|0\n" +
                  "smstate|0\n" +
                  "onlineID|\n")
              );
            }
          }
          