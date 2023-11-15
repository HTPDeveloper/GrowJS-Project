import { Variant } from "growtopia.js";
import { Dialog } from "../abstracts/Dialog";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { DialogReturnType } from "../types/dialog";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Database } from "../database/db";
import { WorldData, WorldDB } from "../types/world";
import { QuickDB } from "quick.db";
const data = new QuickDB

export default class extends Dialog {
  constructor() {
    super();
    this.config = {
      dialogName: "surgery"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      buttonClicked: string;
    }>
  ): void {
    // Set
    let onSurgery = false
    let finished = false


    function shuffleArray<T>(array: T[]): T | undefined {
        if (array.length === 0) {
          return undefined; // Return undefined for an empty array
        }
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      }
      
      
      // Example usage:
      const originalArray = ["Patient broke his leg.", "Patient has flu.", "Patient ate a world lock!"];
      const pulseArray = ["`2Strong", "`1Steady", "`4Weak"]
      const statusArray = ["`4Awake", "`2Unconscious", "`8Coming too..."]
      const tempArray = ["`298.6", "`4100.6", "`290.6", "`4103.6", "`4106.6"]
      const OperationArray = ["`8Unclean", "`2Clean", "`1Not sanitized", "`4Unsanitary"]

      const patient = shuffleArray(originalArray) as unknown as string
      const pulse = shuffleArray(pulseArray) as unknown as string
      const status = shuffleArray(statusArray) as unknown as string
      const temp = shuffleArray(tempArray) as unknown as string
      const Operation = shuffleArray(OperationArray) as unknown as string

    if(action.buttonClicked === "button_ok"){
        let onSurgery = true
    // 1
      console.log(pulse);
      console.log(patient)

      
    const dialog = new DialogBuilder()
    .defaultColor()
    .addLabelWithIcon("Surg-E Robot", "18", "big")
    .addSmallText(`\`4The patient has not been diagnosed!`)
    .addSmallText(`Pulse: \`1${pulse}   \`0Status: \`4Awake`)
    .addSmallText("Temp: `298.6\`0  Operation site: `8Unclean")
    .addSmallText("Incisions: `10")
    .addSpacer("big")
    .addCustomBreak()
    .addButtonWithIcon(1258, 1258, "", "staticBlueFrame") // sponge
    .addButtonWithIcon(1260, 1260, "", "staticBlueFrame") // scalpe
    .addButtonWithIcon(1270, 1270, "", "staticBlueFrame") //  stitches
    .addButtonWithIcon(1266, 1266, "", "staticBlueFrame") // anti-boi
    .addButtonWithIcon(1264, 1264, "", "staticBlueFrame") // anti-spectic
    .addButtonWithIcon(4316, 4316, "", "staticBlueFrame") // unltrasound
    .addCustomBreak()
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(1262, 1262, "", "staticBlueFrame") // anes
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4310, 4310, "", "staticBlueFrame") // trans
    .addCustomBreak()
    .addSpacer("small")
    .endDialog("surgery_end", "", "Give up!")


    peer.send(Variant.from("OnDialogRequest", dialog.str()));

    
    
    }

    
     

  }
}




