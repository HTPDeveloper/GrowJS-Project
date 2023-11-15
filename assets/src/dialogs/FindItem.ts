import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Database } from "../database/db";
import * as fs from 'fs';
import { Role } from "../utils/Constants";


export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "find_item"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      find_item_name: string;
      seed_only: string;
    }>
  ): void {
    // read file
    const filePath = 'itemUnobtainable.txt';

// Read the file asynchronously

  


    /*const isSeed = parseInt(action.seed_only) ? true : false;
    let dialog = new DialogBuilder()
      .defaultColor()
      .addQuickExit()
      .addLabelWithIcon("Find the item", "6016", "big")
      .addSpacer("small");

    const items = base.items.metadata.items.filter((v) =>
      v.name?.toLowerCase().includes(action.find_item_name.toLowerCase())
    );
    
    items.forEach((item) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file: ${err}`);
          return;
        }
      
      if (isSeed && !data) {
        if (item.id! % 2 === 1)
          dialog.addButtonWithIcon(item.id!, item.id!, item.name!, "staticBlueFrame", item.id);
         
      } else {
        if (item.id! % 2 === 0 && !data)
          dialog.addButtonWithIcon(item.id!, item.id!, item.name!, "staticBlueFrame", item.id);
      }
    })
    });*/
    const isSeed = parseInt(action.seed_only) ? true : false;
    if(action.find_item_name.length < 3) return peer.send(Variant.from("OnTextOverlay", "Item name must be at least 3 characters!"));

let dialog = new DialogBuilder()
  .defaultColor()
  .addQuickExit()
  .addLabelWithIcon("Find the item", "6016", "big")
  .addSpacer("small");

const items = base.items.metadata.items.filter((v) =>
  v.name?.toLowerCase().includes(action.find_item_name.toLowerCase())
);

// Define an array of excluded item IDs
const excludedItemIDs = [ // This is a array (to remove items using id)
  1438, 1439, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467,
  1822, 1823, 1978, 1979, 2262, 2263, 2392, 2393, 2394, 2395,
  2722, 2723, 2942, 2943, 3402, 3403, 1674, 1675, 2854, 2855, 2696, 2697, 4820, 4821, 6312, 6313, 4534, 4590,
  4628,
  4746,
  4802, 4988, 5020, 5088, 5206, 5322, 5480, 5638, 5712, 5958, 6016, 6294, 6338, 6758, 6892, 7192, 7196, 7384, 7480,
  7568, 7570, 7572, 7574, 7676, 7678, 7680, 7682, 7836, 7838, 7840, 7842, 8006, 8008, 8010, 8012, 8288, 8290, 8292, 8294,
  8432, 8434, 8436, 8438, 8576, 8578, 8580, 8592, 8816, 8818, 8820, 8822, 8898, 8900, 8902, 8904, 9008, 9010, 9012, 9014,
  9116, 9118, 9120, 9122, 9136, 9138, 9236, 9348, 9408, 9462, 9606, 9648, 9760, 10044, 10128, 10166, 10246, 10426, 10496,
  10618, 10666, 10718, 10810, 10914, 11006, 11116, 11232, 1784, 1780, 1782, 1790, 2592, 1792, 1794, 7734, 8806, 11142, 12422,
  7726, 7728, 7730, 7732, 11140, 7188, 242, 202, 206, 204, 4994  // Add more below this line
];

items.forEach((item) => {
  // Check if the item's ID is in the excludedItemIDs array
  if (!excludedItemIDs.includes(item.id!) && item.id! % 2 === 0 && peer.data.role !== Role.DEVELOPER) {
    // Only add the item to the dialog if its ID is not in the excluded list
    dialog.addButtonWithIcon(item.id!, item.id!, item.name!, "staticBlueFrame", item.id);
  }

   if(peer.data.role === Role.DEVELOPER && isSeed && item.id! % 2 === 1){
    dialog.addButtonWithIcon(item.id!, item.id!, item.name!, "staticBlueFrame", item.id);
  } else if (peer.data.role === Role.DEVELOPER && item.id! % 2 === 0) {
    dialog.addButtonWithIcon(item.id!, item.id!, item.name!, "staticBlueFrame", item.id);
  }
});




    




    // fix spacing dialog later
    // dialog.addSpacer("big");
    dialog.endDialog("find_item_end", "Cancel", "");

    // console.log(dialog.str());

    peer.send(Variant.from("OnDialogRequest", dialog.str()));
  }

}
