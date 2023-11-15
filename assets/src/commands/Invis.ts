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

             
             

              for (let i = 0; i < 14; i++) {
                const random = () => Math.floor(Math.random() * 100);
                const randomRange = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
            
                const x = peer.data.x!;
                const y = peer.data.y!;
                const currentPeer = peer.data.netID as number 
            
                if (random() <= 75)  peer.send(Variant.from({ netID: peer.data.netID },"OnParticleEffect", peer.data.netID, x - 15 * randomRange(0, 5), y - 15 * randomRange(0, 5), randomRange(1, 6), 2, i * 300))
                if (random() <= 75)  peer.send(Variant.from({ netID: peer.data.netID },"OnParticleEffect",peer.data.netID, x + 15 * randomRange(0, 5), y - 15 * randomRange(0, 5), randomRange(1, 6), 2, i * 300))
                if (random() <= 75)  peer.send(Variant.from({ netID: peer.data.netID },"OnParticleEffect",peer.data.netID, x + 15 * randomRange(0, 5), y + 15 * randomRange(0, 5), randomRange(1, 6), 2, i * 300))
                if (random() <= 75)  peer.send(Variant.from({ netID: peer.data.netID },"OnParticleEffect",peer.data.netID, x - 15 * randomRange(0, 5), y + 15 * randomRange(0, 5), randomRange(1, 6), 2, i * 300))
            
                if (random() <= 25)  peer.send(Variant.from({ netID: peer.data.netID },"OnParticleEffect",peer.data.netID, x - 15 * randomRange(0, 5), y - 15 * randomRange(0, 5), randomRange(1, 16), 3, i * 300))
                if (random() <= 25)  peer.send(Variant.from({ netID: peer.data.netID },"OnParticleEffect",peer.data.netID, x + 15 * randomRange(0, 5), y - 15 * randomRange(0, 5), randomRange(1, 16), 3, i * 300))
                if (random() <= 25)  peer.send(Variant.from({ netID: peer.data.netID },"OnParticleEffect",peer.data.netID, x + 15 * randomRange(0, 5), y + 15 * randomRange(0, 5), randomRange(1, 16), 3, i * 300))
                if (random() <= 25)  peer.send(Variant.from({ netID: peer.data.netID },"OnParticleEffect",peer.data.netID, x - 15 * randomRange(0, 5), y + 15 * randomRange(0, 5), randomRange(1, 16), 3, i * 300))
            
                // Uncomment the following code block if needed
                /*
                if (random() <= 25) SendParticleEffect(currentPeer, x - 15 * randomRange(0, 5), y - 15 * randomRange(0, 5), randomRange(1, 16), 57, i * randomRange(0, 3000));
                if (random() <= 25) SendParticleEffect(currentPeer, x + 15 * randomRange(0, 5), y - 15 * randomRange(0, 5), randomRange(1, 16), 57, i * randomRange(0, 3000));
                if (random() <= 25) SendParticleEffect(currentPeer, x + 15 * randomRange(0, 5), y + 15 * randomRange(0, 5), randomRange(1, 16), 57, i * randomRange(0, 3000));
                if (random() <= 25) SendParticleEffect(currentPeer, x - 15 * randomRange(0, 5), y + 15 * randomRange(0, 5), randomRange(1, 16), 57, i * randomRange(0, 3000));
                */
            }

            //peer.send(Variant.from({ netID: peer.data.netID }, "OnInvis",  1))

            

            }
          }
          