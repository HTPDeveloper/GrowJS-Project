import { Peer } from "../structures/Peer";
import { ActionConfig, ActionType } from "../types/action";
import { BaseServer } from "../structures/BaseServer";
import { World } from "../structures/World";
import { TankPacket } from "growtopia.js";
import { Database } from "../database/db";

export abstract class Action {
  public config: ActionConfig;

  constructor() {
    this.config = {
      eventName: undefined
    };
  }

  public handle(base: BaseServer, peer: Peer, db: Database, action: ActionType<unknown>) {}
}
