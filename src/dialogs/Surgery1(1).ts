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
      dialogName: "surgery_end"
    };
  }

  public async handle(
    _base: BaseServer,
    peer: Peer,
    _db: Database,
    action: DialogReturnType<{
      action: string;
      dialog_name: string;
      buttonClicked: string;
    }>
  ): Promise<void> {
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
      const originalArray = ["Patient broke his leg.", "Patient has a flu.", "Patient ate a world lock!", "Patient broke his leg.", "Patient ate a world lock!"];
      const pulseArray = ["`2Strong", "`1Steady", "`4Weak"]
      const statusArray = ["`4Awake", "`2Unconscious", "`8Coming too..."]
      const tempArray = ["`298.6", "`4100.6", "`290.6", "`4103.6", "`4106.6", "`298.6", "`4100.6", "`298.6", "`4100.6",]
      const OperationArray = ["`8Unclean", "`2Clean", "`1Not sanitized", "`4Unsanitary"]
      let incisions = 0

      const patient = shuffleArray(originalArray) as unknown as string
      const pulse = shuffleArray(pulseArray) as unknown as string
      const status = shuffleArray(statusArray) as unknown as string
      const temp = shuffleArray(tempArray) as unknown as string
      const Operation = shuffleArray(OperationArray) as unknown as string

      // db
     let pat = await data.get(`patient_${peer.data.id_user}`)
     let pul =  await data.get(`pulse_${peer.data.id_user}`)
     let stat = await data.get(`status_${peer.data.id_user}`)
     let temp1 = await data.get(`temp_${peer.data.id_user}`)
      let op = await data.get(`Operation_${peer.data.id_user}`)
      let inc : number | null  = await data.get(`incisions_${peer.data.id_user}`)
      let fixit = await data.get(`fixit_${peer.data.id_user}`)

      let toPassSurgery1 = { // Patient broken leg
        tempArray : "`298.6" || "`290.6",
        finished: true,
        onSurgery: false,
        incisios: 3,
        end_incisions: 0,
        fixit: true
      }

      let toPassSurgery2 = { // Patient has flu
        tempArray : "`298.6" || "`290.6",
        finished: true,
        onSurgery: false,
        incisios: 0,
        end_incisions: 0,
      }

      let toPassSurgery3 = { // Patient ate a wl
        tempArray : "`298.6" || "`290.6",
        finished: true,
        onSurgery: false,
        incisios: 4,
        end_incisions: 0,
        fixit: true
      }

      // Dialog
     

      //if(action.buttonClicked === "4316") {
        switch(action.buttonClicked){
          
          case "4316": { // unltra
            onSurgery = true
    // 1
      console.log(pulse);
      console.log(patient)

      let p;

      if(patient === "Patient has flu.") data.set(`temp_${peer.data.id_user}`, "`4100.6")


      
    const dialog = new DialogBuilder()
    .defaultColor()
    .addLabelWithIcon("Surg-E Robot", "18", "big")
    .addSmallText(`${patient}`)
    .addSmallText(`Pulse: \`1${pulse}   \`0Status: \`4${status}`)
    .addSmallText(`Temp: ${temp1}\`0  Operation site: ${Operation}`)
    .addSmallText(`Incisions: \`10`)
    .addSpacer("big")
    .addCustomBreak()
    .addButtonWithIcon(1258, 1258, "", "staticBlueFrame") // sponge
    .addButtonWithIcon(1260, 1260, "", "staticBlueFrame") // scalpe
    .addButtonWithIcon(1270, 1270, "", "staticBlueFrame") //  stitches
    .addButtonWithIcon(1266, 1266, "", "staticBlueFrame") // anti-boi
    .addButtonWithIcon(1264, 1264, "", "staticBlueFrame") // anti-spectic
    if(onSurgery){
        dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    }else{
        dialog.addButtonWithIcon(4316, 4316, "", "staticBlueFrame") // unltrasound
    }
    
    dialog.addCustomBreak()
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(1262, 1262, "", "staticBlueFrame") // anes
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4310, 4310, "", "staticBlueFrame") // trans
    .addCustomBreak()
    .addSpacer("small")
    .endDialog("surgery_end", "", "Give up!")


    data.set(`patient_${peer.data.id_user}`, patient)
    data.set(`pulse_${peer.data.id_user}`, pulse)
    data.set(`status_${peer.data.id_user}`, status)
    data.set(`temp_${peer.data.id_user}`, temp || p)
    data.set(`Operation_${peer.data.id_user}`, Operation)
    data.set(`incisions_${peer.data.id_user}`, incisions)
    

    peer.send(Variant.from("OnDialogRequest", dialog.str()));
    
    break;

}
case "1260": { // scaple
  onSurgery = true
  if(pat === "Patient has a flu." || stat === "`4Awake") return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`4Malpractice! `wCould'nt perform any surgery for next 1 hour.`0"));

  if((_inc: any) => 0){ 

      //if(pat === "Patient has flu.") p = "`4106.6"
      
    const dialog = new DialogBuilder()
    .defaultColor()
    .addLabelWithIcon("Surg-E Robot", "18", "big")
    .addSmallText(`${pat}`)
    .addSmallText(`Pulse: \`1${pul}   \`0Status: \`4${stat}`)
    .addSmallText(`Temp: ${temp1}\`0  Operation site: ${op}`)
    .addSmallText(`Incisions: \`1${inc}`)
    .addSpacer("big")
    .addCustomBreak()
    .addButtonWithIcon(1258, 1258, "", "staticBlueFrame") // sponge
    .addButtonWithIcon(1260, 1260, "", "staticBlueFrame") // scalpe
    .addButtonWithIcon(1270, 1270, "", "staticBlueFrame") //  stitches
    .addButtonWithIcon(1266, 1266, "", "staticBlueFrame") // anti-boi
    .addButtonWithIcon(1264, 1264, "", "staticBlueFrame") // anti-spectic
    if(onSurgery){
        dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    }else{
        dialog.addButtonWithIcon(4316, 4316, "", "staticBlueFrame") // unltrasound
    }
    
    dialog.addCustomBreak()
    if(inc === toPassSurgery1.incisios || inc === toPassSurgery3.incisios){
      dialog.addButtonWithIcon(1296, 1296, "", "staticBlueFrame") // tray
    }else{
    dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    }
    dialog.addButtonWithIcon(1262, 1262, "", "staticBlueFrame") // anes
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4310, 4310, "", "staticBlueFrame") // trans
    .addCustomBreak()
    .addSpacer("small")
    .endDialog("surgery_end", "", "Give up!")

    if(inc! > toPassSurgery1.incisios){
      return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`4Malpractice! `wCould'nt perform any surgery for next 1 hour.`0"));
    }
     data.add(`incisions_${peer.data.id_user}`, 1)


    peer.send(Variant.from({delay: 200}, "OnDialogRequest", dialog.str()));
}else if(inc! < 0){
data.set(`incisions_${peer.data.id_user}`, 0)
}
break;
}
    case "1296": { // Fix it
      onSurgery = true
      const dialog = new DialogBuilder()
    .defaultColor()
    .addLabelWithIcon("Surg-E Robot", "18", "big")
    .addSmallText(`${pat}`)
    .addSmallText(`Pulse: \`1${pul}   \`0Status: \`4${stat}`)
    .addSmallText(`Temp: ${temp1}\`0  Operation site: ${op}`)
    .addSmallText(`Incisions: \`1${inc}`)
    .addSpacer("big")
    .addCustomBreak()
    .addButtonWithIcon(1258, 1258, "", "staticBlueFrame") // sponge
    .addButtonWithIcon(1260, 1260, "", "staticBlueFrame") // scalpe
    .addButtonWithIcon(1270, 1270, "", "staticBlueFrame") //  stitches
    .addButtonWithIcon(1266, 1266, "", "staticBlueFrame") // anti-boi
    .addButtonWithIcon(1264, 1264, "", "staticBlueFrame") // anti-spectic
    if(onSurgery){
        dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    }else{
        dialog.addButtonWithIcon(4316, 4316, "", "staticBlueFrame") // unltrasound
    }
    
    dialog.addCustomBreak()
    dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    dialog.addButtonWithIcon(1262, 1262, "", "staticBlueFrame") // anes
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
    .addButtonWithIcon(4310, 4310, "", "staticBlueFrame") // trans
    .addCustomBreak()
    .addSpacer("small")
    .endDialog("surgery_end", "", "Give up!")

    data.set(`fixit_${peer.data.id_user}`, true)

    peer.send(Variant.from({delay: 200}, "OnDialogRequest", dialog.str()));
    break;
    }
    case "1266": {
      onSurgery = true
      if(pat === "Patient broke his leg." && temp1 === toPassSurgery1.tempArray && inc === toPassSurgery1.end_incisions && fixit){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }else if(pat === "Patient has a flu." && temp1 === toPassSurgery2.tempArray){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }else if(pat === "Patient ate a world lock!" && temp1 === toPassSurgery3.tempArray && inc === toPassSurgery2.end_incisions && fixit){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }

      if(inc! < 0){
        data.set(`incisions_${peer.data.id_user}`, 0)
      }

      if(pat === "Patient has a flu." || temp1){

        data.set(`temp_${peer.data.id_user}`, temp)

        const dialog = new DialogBuilder()
        .defaultColor()
        .addLabelWithIcon("Surg-E Robot", "18", "big")
        .addSmallText(`${pat}`)
        .addSmallText(`Pulse: \`1${pul}   \`0Status: \`4${stat}`)
        .addSmallText(`Temp: ${temp1}\`0  Operation site: ${op}`)
        .addSmallText(`Incisions: \`1${inc}`)
        .addSpacer("big")
        .addCustomBreak()
        .addButtonWithIcon(1258, 1258, "", "staticBlueFrame") // sponge
        .addButtonWithIcon(1260, 1260, "", "staticBlueFrame") // scalpe
        .addButtonWithIcon(1270, 1270, "", "staticBlueFrame") //  stitches
        .addButtonWithIcon(1266, 1266, "", "staticBlueFrame") // anti-boi
        .addButtonWithIcon(1264, 1264, "", "staticBlueFrame") // anti-spectic
        if(onSurgery){
            dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        }else{
            dialog.addButtonWithIcon(4316, 4316, "", "staticBlueFrame") // unltrasound
        }
        
        dialog.addCustomBreak()
        dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        dialog.addButtonWithIcon(1262, 1262, "", "staticBlueFrame") // anes
        .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        .addButtonWithIcon(4310, 4310, "", "staticBlueFrame") // trans
        .addCustomBreak()
        .addSpacer("small")
        .endDialog("surgery_end", "", "Give up!")
    
        peer.send(Variant.from({delay: 200}, "OnDialogRequest", dialog.str()));
      }
      
      break;
    }
    case "1270": { // stit
      onSurgery = true
      if(pat === "Patient broke his leg." && temp1 === toPassSurgery1.tempArray && inc === toPassSurgery1.end_incisions && fixit){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }else if(pat === "Patient has a flu." && temp1 === toPassSurgery2.tempArray){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }else if(pat === "Patient ate a world lock!" && temp1 === toPassSurgery3.tempArray && inc === toPassSurgery2.end_incisions && fixit){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }
      if((_inc: any) => 1){ 
      


      const dialog = new DialogBuilder()
        .defaultColor()
        .addLabelWithIcon("Surg-E Robot", "18", "big")
        .addSmallText(`${pat}`)
        .addSmallText(`Pulse: \`1${pul}   \`0Status: \`4${stat}`)
        .addSmallText(`Temp: ${temp1}\`0  Operation site: ${op}`)
        .addSmallText(`Incisions: \`1${inc}`)
        .addSpacer("big")
        .addCustomBreak()
        .addButtonWithIcon(1258, 1258, "", "staticBlueFrame") // sponge
        .addButtonWithIcon(1260, 1260, "", "staticBlueFrame") // scalpe
        .addButtonWithIcon(1270, 1270, "", "staticBlueFrame") //  stitches
        .addButtonWithIcon(1266, 1266, "", "staticBlueFrame") // anti-boi
        .addButtonWithIcon(1264, 1264, "", "staticBlueFrame") // anti-spectic
        if(onSurgery){
            dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        }else{
            dialog.addButtonWithIcon(4316, 4316, "", "staticBlueFrame") // unltrasound
        }
        
        dialog.addCustomBreak()
        dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        dialog.addButtonWithIcon(1262, 1262, "", "staticBlueFrame") // anes
        .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
        .addButtonWithIcon(4310, 4310, "", "staticBlueFrame") // trans
        .addCustomBreak()
        .addSpacer("small")
        .endDialog("surgery_end", "", "Give up!")

        data.sub(`incisions_${peer.data.id_user}`, 1)
    
        peer.send(Variant.from({delay: 200}, "OnDialogRequest", dialog.str()));
    }else if(inc! < 0){
      data.set(`incisions_${peer.data.id_user}`, 0)
    }
    break;
  }
    case "1262": {
      onSurgery = true
      if(pat === "Patient broke his leg." && temp1 === toPassSurgery1.tempArray && inc === toPassSurgery1.end_incisions && fixit){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }else if(pat === "Patient has a flu." && temp1 === toPassSurgery2.tempArray){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }else if(pat === "Patient ate a world lock!" && temp1 === toPassSurgery3.tempArray && inc === toPassSurgery2.end_incisions && fixit){
        return peer.send(Variant.from("OnTalkBubble", peer.data.netID, "`2Success!"));
      }

      data.set(`status_${peer.data.id_user}`, status)

      const dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon("Surg-E Robot", "18", "big")
      .addSmallText(`${pat}`)
      .addSmallText(`Pulse: \`1${pul}   \`0Status: \`4${stat}`)
      .addSmallText(`Temp: ${temp1}\`0  Operation site: ${op}`)
      .addSmallText(`Incisions: \`1${inc}`)
      .addSpacer("big")
      .addCustomBreak()
      .addButtonWithIcon(1258, 1258, "", "staticBlueFrame") // sponge
      .addButtonWithIcon(1260, 1260, "", "staticBlueFrame") // scalpe
      .addButtonWithIcon(1270, 1270, "", "staticBlueFrame") //  stitches
      .addButtonWithIcon(1266, 1266, "", "staticBlueFrame") // anti-boi
      .addButtonWithIcon(1264, 1264, "", "staticBlueFrame") // anti-spectic
      if(onSurgery){
          dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
      }else{
          dialog.addButtonWithIcon(4316, 4316, "", "staticBlueFrame") // unltrasound
      }
      
      dialog.addCustomBreak()
      dialog.addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
      dialog.addButtonWithIcon(1262, 1262, "", "staticBlueFrame") // anes
      .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
      .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
      .addButtonWithIcon(4320, 4320, "", "staticBlueFrame") // tray
      .addButtonWithIcon(4310, 4310, "", "staticBlueFrame") // trans
      .addCustomBreak()
      .addSpacer("small")
      .endDialog("surgery_end", "", "Give up!")
  
      peer.send(Variant.from({delay: 200}, "OnDialogRequest", dialog.str()));

      
    }
    break;
        }

  }
}




