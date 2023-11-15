import { TankPacket, Variant } from "growtopia.js";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { World } from "../structures/World";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { ActionTypes } from "../utils/enums/Tiles";
import { it } from "node:test";
import { QuickDB } from "quick.db";
const data = new QuickDB

export async function handleWrench(base: BaseServer, tank: TankPacket, peer: Peer, world: World) {
  const tankData = tank.data!;
  const pos = tankData.xPunch! + tankData.yPunch! * world.data.width!;
  const block = world.data.blocks![pos];
  const itemMeta = base.items.metadata.items[block.fg || block.bg!];

  switch (itemMeta.type) {
    case ActionTypes.SIGN: {
      if (world.data.owner) {
        if (world.data.owner.id !== peer.data.id_user) return;
      }
      const dialog = new DialogBuilder()
        .defaultColor()
        .addLabelWithIcon(`\`wEdit ${itemMeta.name}\`\``, itemMeta.id!, "big")
        .addTextBox("What would you like to write on this sign?")
        .addInputBox("label", "", block.sign?.label, 100)
        .embed("tilex", block.x)
        .embed("tiley", block.y)
        .embed("itemID", itemMeta.id)
        .endDialog("sign_edit", "Cancel", "OK")
        .str();

      peer.send(Variant.from("OnDialogRequest", dialog));
    }

    case ActionTypes.PORTAL:
    case ActionTypes.DOOR: {
      if (world.data.owner) {
        if (world.data.owner.id !== peer.data.id_user) return;
      }
      const dialog = new DialogBuilder()
        .defaultColor()
        .addLabelWithIcon(`\`wEdit ${itemMeta.name}\`\``, itemMeta.id!, "big")
        .addInputBox("label", "Label", block.door?.label, 100)
        .addInputBox("target", "Destination", block.door?.destination, 24)
        .addSmallText("Enter a Destination in this format: `2WORLDNAME:ID``")
        .addSmallText(
          "Leave `2WORLDNAME`` blank (:ID) to go to the door with `2ID`` in the `2Current World``."
        )
        .addInputBox("id", "ID", block.door?.id, 11)
        .addSmallText("Set a unique `2ID`` to target this door as a Destination from another!")
        .embed("tilex", block.x)
        .embed("tiley", block.y)
        .embed("itemID", itemMeta.id)
        .endDialog("door_edit", "Cancel", "OK")
        .str();

      peer.send(Variant.from("OnDialogRequest", dialog));
    }

    case ActionTypes.XENONITE: {
      if (world.data.owner) {
        if (world.data.owner.id !== peer.data.id_user) return;
      }

        const haveXeno = await data.get(`haveXeno_${peer.data.world}`)

        if(haveXeno === false){
          const dialog = new DialogBuilder()
          .defaultColor()
          .addLabelWithIcon(`\`w${itemMeta.name}`, itemMeta.id!, "big")
          .addSpacer("small")
          .addCheckbox("strong_hit", "Block Strong Punch", "not_selected")
          .addSpacer("small")
          .endDialog("xeno_edit", "Cancel", "Update")
          .str()
  
          peer.send(Variant.from("OnDialogRequest", dialog));
        }else{
          const dialog = new DialogBuilder()
          .defaultColor()
          .addLabelWithIcon(`\`w${itemMeta.name}`, itemMeta.id!, "big")
          .addSpacer("small")
          .addCheckbox("strong_hit", "Block Strong Punch", "selected")
          .addSpacer("small")
          .endDialog("xeno_edit", "Cancel", "Update")
          .str()
  
          peer.send(Variant.from("OnDialogRequest", dialog));
        }

       
    }

    case ActionTypes.VENDING_MACHINE:{
      if(world.data.owner) {
        if (world.data.owner.id !== peer.data.id_user) return;
      }
    
      const dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon(`${itemMeta.name}`, itemMeta.id!, "big")
      .addSmallText("This machine is empty.")
      .addButton("putItem", "Put an item in")
      .endDialog("vend", "Close", "Update")
      .str()

      peer.send(Variant.from({ delay: 100 }, "OnDialogRequest", dialog));
    }

    case ActionTypes.LOCK: {
      if(world.data.owner) {
        if (world.data.owner.id !== peer.data.id_user) return;
      }

      // Assuming world.data.admins is an array of numbers
      const adminsArray = world.data?.admins;

      

      const resultArray = adminsArray?.length ? adminsArray : ["none"];
      
      //console.log(resultArray);

// Check if adminsArray is defined before accessing its elements
class World {
  static async getData(): Promise<any> {
    try {
      // Fetch and return data
      const data = await fetchData(); // Replace with your actual data retrieval logic
      return data;
    } catch (error) {
      throw error;
    }
  }
}
world.getData()
.then((data) => {
  console.log("Resolved Data:", data);
})
.catch((error) => {
  console.error("Error:", error);
});

      let dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon(`Edit ${itemMeta.name}`, itemMeta.id!, "big")
      .addSmallText("Access list:")
      if(JSON.stringify(resultArray) !== JSON.stringify(["none"])){ 
        dialog.addCheckbox("admins", `${resultArray}`, "selected")
      }
      dialog.addSpacer("small")
      .raw("add_player_picker|playerNetID|`wAdd``\n")
      .addCheckbox("public_build", "Allow anyone to build", "not_selected")
      .addCheckbox("dis_music_block", "Disable custom music blocks", "not_selected")
      .addCheckbox("invis_music", "Make custom music blocks invisible", "not_selected")
      .addSpacer("small")
      .addButton("category", "Category: None")
      .addButton("key", "`9Get World Key")
      .addInputBox("bpm", "BPM", world.data.bpm, 3)
      .addQuickExit()
      .endDialog("world_lock", "Continue", "OK")
      .str();
  
    peer.send(Variant.from({ delay: 100 }, "OnDialogRequest", dialog.str()));

      
      if(itemMeta.id === 5814){
        let dialog = new DialogBuilder()
        .defaultColor()
        .addLabelWithIcon(`Edit ${itemMeta.name}`, itemMeta.id!, "big")
        .addSmallText("Access list:")
        if(JSON.stringify(resultArray) !== JSON.stringify(["none"])){ 
          dialog.addCheckbox("admins", `${resultArray}`, "selected")
        }
      dialog.addSpacer("small")
      .raw("add_player_picker|playerNetID|`wAdd``\n")
      .addCheckbox("public_build", "Allow anyone to build", "not_selected")
      .addCheckbox("dis_music_block", "Disable custom music blocks", "not_selected")
      .addCheckbox("invis_music", "Make custom music blocks invisible", "not_selected")
      .addSpacer("small")
      .addButton("category", "Category: None")
      .addButton("key", "`9Get World Key")
      .addInputBox("bpm", "BPM", world.data.bpm, 3)
      .addQuickExit()
      .endDialog("world_lock", "Continue", "OK")
      .str();
  
    peer.send(Variant.from({ delay: 100 }, "OnDialogRequest", dialog.str()));
      }
    }
  }
  const carnival = await data.get(`Carnival`)
  const OnQuest = await data.get(`OnQuest_${peer.data.id_user}`)

  if(itemMeta.id === 1900){
    if(world.worldName === "CARNIVAL" && carnival) { 

      if(OnQuest){
        const Item = await data.get(`Item_${peer.data.id_user}`)
        const Count = await data.get(`Count_${peer.data.id_user}`)
    
        const dialog = new DialogBuilder()
        .defaultColor()
        .addLabelWithIcon(`\`9Quest For The Ring`, 1900, "big")
        .addSmallText(`(Step 1/1)`)
        .addSpacer("small")
        .addSmallText(`Your task is to bring me ${Count} of them ${Item} things!`)
        .addSpacer("small")
        .addSmallText(`(Current progress 0/${Count})`)
        .addButton("deliver", `\`9Deliver ${Count} ${Item}`)
        .addButton("giveup", "\`9Give up this quest")
        .addSpacer("small")
        .addSmallText("If you had 10 rings of the same type maybe we could have made a deal...")
        .addSpacer("small")
        .endDialog("noob", "Goodbye", "")
        .str()
    
        peer.send(Variant.from("OnDialogRequest", dialog));
    }
    
    const dialog = new DialogBuilder()
        .defaultColor()
        .addLabelWithIcon(`\`9${itemMeta.name}`, itemMeta.id!, "big")
        .addSpacer("small")
        .addSmallText("Come one, come all, to the most extraordinary show in GrowJS! I am Ringmaster. That means I know alot about Rings! For 10 Golden Tickets, I might even tell you how you get a Ring of your own...")
        .addSpacer("small")
        .addButton("ring_masters", "`9Give 10 Golden Tickets")
        .addSpacer("small")
        .addSmallText("If you had 10 rings of the same type maybe we could have made a deal...")
        .addSpacer("small")
        .endDialog("ring_master", "Goodbye", "")
        //.str()

        peer.send(Variant.from("OnDialogRequest", dialog.str()));

  }
  }
if(itemMeta.id === 1902){
  if(world.worldName === "CARNIVAL" && carnival) {
    const dialog = new DialogBuilder()
    .defaultColor()
    .addLabelWithIcon(`\`9${itemMeta.name}`, itemMeta.id!, "big")
    .addSpacer("small")
    .addSmallText("Finding tickets? Grab some here!")
    .addSpacer("small")
    .addInputBox("count", "", "", 5)
    .addSpacer("small")
    .addButton("ticket", "`9Purchase Tickets")
    .addSpacer("small")
    .endDialog("ringmaster", "Goodbye", "")
    .str()

    peer.send(Variant.from("OnDialogRequest", dialog));
  }
}

if(itemMeta.id === 3898){
  const dialog = new DialogBuilder()
  .defaultColor()
  .addLabelWithIcon(`${itemMeta.name}`, itemMeta.id!, "big")
  .addSmallText("Dial a number to call somebody in GrowJS. Phone numbers have 5 digits. Most numbers are not in service!")
  .addInputBox("number", "Phone #", "", 5)
  .endDialog("phone", "Hang Up", "Dial")
  .str()

  peer.send(Variant.from("OnDialogRequest", dialog));
}

if(itemMeta.id === 4296){
  const Dialog = new DialogBuilder()
  .defaultColor()
  .addLabelWithIcon(`\`9${itemMeta.name} Surg-E Anatomical Dummy`, itemMeta.id!, "big")
  .addSmallText(`Surgeon Skill: 100`)
  .addLabel("Are you sure you want to perform surgery on this robot? Whether you succeed or fail, the robot will be destroyed in the process.")
  .endDialog("surgery", "Cancel", "Okay!")

  peer.send(Variant.from("OnDialogRequest", Dialog.str()));
}


}

function fetchSomeData() {
  throw new Error("Function not implemented.");
}

function fetchData() {
  throw new Error("Function not implemented.");
}

