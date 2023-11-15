import { TextPacket } from "growtopia.js";
import { Listener } from "../abstracts/Listener";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import * as fs from 'fs';
import { QuickDB } from "quick.db";
import { Database } from "../database/db";
const data = new QuickDB



export default class extends Listener<"connect"> {
  constructor() {
    super();
    this.name = "connect";
  }

  public async run(base: BaseServer, netID: number): Promise<void> {
    console.log("Peer", netID, "connected.");

    const peer = new Peer(base, netID);
    const packet = TextPacket.from(0x1);

    peer.send(packet);
    base.cache.users.setSelf(netID, peer.data);




    const filePath = 'number.txt';

// Read the current number from the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse the data as an integer
  const currentNumber = parseInt(data, 10);

  // Check if the parsed value is a valid number
  if (!isNaN(currentNumber)) {
    // Increment the number by 1
    const updatedNumber = currentNumber + 1;

    // Write the updated number back to the file
    fs.writeFile(filePath, updatedNumber.toString(), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File updated. New number:', updatedNumber);
      }
    });
  } else {
    console.error('File does not contain a valid number.');
  }
});

const time = new Date()


data.set(`PlayerLastJoined_${peer.data.id_user}`, { user_id: peer.data.id_user, time: time.getDate() })

console.log(time.getDate())

  
  }
}
