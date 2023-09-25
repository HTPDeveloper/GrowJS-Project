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
      name: "dq",
      description: "Change daily quest deliver items",
      cooldown: 0,
      ratelimit: 1,
      category: "Basic",
      usage: "/dq",
      example: ["/dq "],
      permission: [Role.BASIC, Role.SUPPORTER, Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> { 

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      // Example: Generate a random number between 1 and 10 (inclusive)
      const randomNum = getRandomInt(4, 1005);

      function getRandomInt1(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      // Example: Generate a random number between 1 and 10 (inclusive)
      const randomNum2 = getRandomInt1(4, 1005);

      const items = base.items.metadata.items

      const foundItem = items.find((item) => item.id === randomNum);
      const foundItem2 = items.find((item) => item.id === randomNum2);

      function getRandomInt3(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      // Example: Generate a random number between 1 and 10 (inclusive)
      const randomNum3 = getRandomInt3(1, 150)

      function getRandomInt4(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      // Example: Generate a random number between 1 and 10 (inclusive)
      const randomNum4 = getRandomInt4(1, 150)



      peer.everyPeer((p) => {
       const dialog = new DialogBuilder()
       .defaultColor()
       .addLabelWithIcon("Today's Daily Quest", 3902, "big")
       .addSpacer("small")
       .addLabelWithIcon(`<- Deliver ${randomNum3} \`2${foundItem?.name}`, randomNum, "small")
       .addSmallText("And")
       .addLabelWithIcon(`<- Deliver ${randomNum4} \`2${foundItem2?.name}`, randomNum2, "small")
       .addQuickExit()
       .str()

       p.send(Variant.from("OnDialogRequest", dialog));
       p.send(Variant.from("OnConsoleMessage", "`2New Daily Quest for today`0, `9Check with Crazy Jim for items to deliver and get a reward of 1 Growtoken!"))

       data.set(`dqItem1`, randomNum)
       data.set(`dqItem2`, randomNum2)
       data.set(`dqCount1`, randomNum3)
       data.set(`dqCount2`, randomNum4)

       // remove those who have dqCompleted on
       data.set(`dqCompleted`, false)
       
      })

  }
}
