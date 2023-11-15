import { Listener } from "../abstracts/Listener";
import { Database } from "../database/db";
import { BaseServer } from "../structures/BaseServer";
import * as fs from 'fs';

export default class extends Listener<"disconnect"> {
  constructor() {
    super();
    this.name = "disconnect";
  }

  public run(base: BaseServer, netID: number): void {
    console.log("Peer", netID, "disconnected");
    let peer = base.cache.users.getSelf(netID);
    peer?.leaveWorld();
    peer?.saveToDatabase();

    base.cache.users.delete(netID);


    const filePath = 'number.txt';

// Function to read and decrement a number in a file
const decrementNumberInFile = (filePath: string) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    // Parse the data as an integer
    let currentNumber = parseInt(data, 10);

    // Check if the parsed value is a valid number
    if (!isNaN(currentNumber) && currentNumber > 0) {
      // Decrement the number by 1
      currentNumber -= 1;

      // Write the updated number back to the file
      fs.writeFile(filePath, currentNumber.toString(), 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${filePath}:`, err);
        } else {
          console.log(`File ${filePath} updated. New number:`, currentNumber);
        }
      });
    } else {
      console.error(`File ${filePath} does not contain a valid number.`);
    }
  });
};

// Example usage: Decrement the number in "number.txt" by 1
decrementNumberInFile(filePath);
  }
}
