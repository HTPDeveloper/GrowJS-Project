import { Action } from "../abstracts/Action";
import { Peer } from "../structures/Peer";
import { BaseServer } from "../structures/BaseServer";
import { ActionType } from "../types/action";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Variant } from "growtopia.js";
import { Database } from "../database/db";

export default class extends Action {
  constructor() {
    super();
    this.config = {
      eventName: "store"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: ActionType<{ action: string; itemID: string }>
  ): void {
    const itemID = parseInt(action.itemID);
    const item = base.items.metadata.items.find((v) => v.id === itemID);
    const peerItem = peer.data.inventory?.items.find((v) => v.id === itemID);

    let dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon("Gem Store", 112, "big")      //.addLabelWithIcon(`Drop ${item?.name}`, item?.id!, "big")
      .addButton("lock", "Locks Store")
      .addSpacer("small")
      .addButton("wings", "Wings Store")
      .addSpacer("small")
      .addButton("Title", "Title Store")
      .addSpacer("small")
      .addButton("sitems", "Special Items Store")
      .addSpacer("big")
      .addSmallText("* `9Lock converter`0 *")
      .addButtonWithIcon("dl", 1796, "Diamond Lock")
      .addButtonWithIcon("bgl", 7188, "Blue Gem Lock")
      //.addInputBox("drop_count", "", peerItem?.amount, 5)
      .embed("itemID", itemID)
      //.endDialog("drop_end", "Cancel", "OK")
      .addQuickExit()
      .str();

    peer.send(Variant.from("OnDialogRequest", dialog));
  }
}
