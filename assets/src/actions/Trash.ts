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
      eventName: "trash"
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

    if(peerItem?.id === 32 || peerItem?.id === 18) return peer.send(Variant.from("OnTextOverlay", "Cannot trash this item."))

    let dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon(`\`4Trash\`\` ${item?.name}`, item?.id!, "big")
      .addTextBox(`How many to \`4destroy\`\`? (you have ${peerItem?.amount})`)
      .addInputBox("trash_count", "", peerItem?.amount, 5)
      .embed("itemID", itemID)
      .endDialog("trash_end", "Cancel", "OK")
      .str();

    peer.send(Variant.from("OnDialogRequest", dialog));
  }
}
