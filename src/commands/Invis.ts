          import { TankPacket, TextPacket, Variant, TankTypes } from "growtopia.js";
          import { Command } from "../abstracts/Command";
          import { BaseServer } from "../structures/BaseServer";
          import { Peer } from "../structures/Peer";
          import { CommandOptions } from "../types/command";
          import { DialogBuilder } from "../utils/builders/DialogBuilder";
          import { Role } from "../utils/Constants";
          import { DataTypes } from "../utils/enums/DataTypes";
import { World } from "../structures/World";
          
          export default class extends Command {
            public opt: CommandOptions;
          
            constructor() {
              super();
              this.opt = {
                name: "invis",
                description: "Super broadcast to players online.",
                cooldown: 0,
                ratelimit: 1,
                category: "Basic",
                usage: "/invis",
                example: ["/invis"],
                permission: [Role.BASIC, Role.ADMIN, Role.DEVELOPER]
              };
            }
          
            public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> {
             const isInvis = true
              const tank = TankPacket.from({
                type: 20,
                state: 0x8,
                packetType: 17 
                
                
              });
              peer.send(tank)

              const world = peer.hasWorld(peer.data.world);

            peer.send(Variant.from({ netID: peer.data.netID }, "OnInvis",  1))

            

            }
          }
          
