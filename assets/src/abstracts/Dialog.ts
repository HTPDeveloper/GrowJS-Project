import { Peer } from "../structures/Peer";
import { BaseServer } from "../structures/BaseServer";
import { DialogConfig, DialogReturnType } from "../types/dialog";
import { World } from "../structures/World";
import { TankPacket } from "growtopia.js";
import { Database } from "../database/db";
import { QuickDB } from "quick.db";
const data = new QuickDB

export abstract class Dialog {
  public config: DialogConfig;

  constructor() {
    this.config = {
      dialogName: undefined
    };
  }

  public handle(base: BaseServer, peer: Peer, db: Database, action: DialogReturnType<unknown>) {}
}
