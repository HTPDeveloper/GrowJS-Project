import { TankPacket, Variant } from "growtopia.js";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { World } from "../structures/World";
import { Role } from "../utils/Constants";
import { TankTypes } from "../utils/enums/TankTypes";
import { ActionTypes } from "../utils/enums/Tiles";
import { tileUpdate } from "./BlockPlacing";
import { QuickDB } from "quick.db";
import { gameEvents } from "./game_events.ts";
import { HandleTile } from "../structures/TileExtra";
import { Block } from "../types/world";
const data = new QuickDB

/** Handle Punch */
export async function handlePunch(tank: TankPacket, peer: Peer, base: BaseServer, world: World): Promise<void>  {
  const tankData = tank.data!;
  const pos = tankData.xPunch! + tankData.yPunch! * world.data.width!;
  const block = world.data.blocks![pos];
  const itemMeta = base.items.metadata.items[block.fg || block.bg!];
  const haveXeno = await data.get(`haveXeno_${peer.data.world}`)
  let isSignalJammer = false


  if(block.fg === 226 && itemMeta.type === ActionTypes.BOOMBOX){ 
    isSignalJammer = true
    peer.send(Variant.from("OnPlayPositioned", "audio/signal_jammer.wav"))
    peer.send(Variant.from("OnConsoleMessage", "You `4Jammed `0 the world."))

    
  }else if(isSignalJammer = true && itemMeta.type === ActionTypes.BOOMBOX){
    peer.send(Variant.from("OnConsoleMessage", "You `2unjammed `0 the world."))
  }
  
  if(!haveXeno){
    block.damage = block.damage
  }else if(haveXeno && block.damage === itemMeta.breakHits){
    block.damage = 250
  }


    const GemEvnt = await data.get(`GemEvent`);
  const Gems = await data.get(`GemEventGems`) as unknown as number

  if(block.damage === itemMeta.breakHits){
    let g : number;

    itemMeta.rarity! <= 10 ? g = 5 : null;
    itemMeta.rarity! > 10 ? g = 10: null;
    itemMeta.rarity! >= 20 ? g = 20 : null;
    itemMeta.rarity! >= 30 ? g = 30 : null;
    itemMeta.rarity! >= 40 ? g = 50 : null;
    itemMeta.rarity! >= 50 ? g = 75 : null;
    itemMeta.rarity! >= 100 ? g = 150 : null;
    itemMeta.rarity! >= 200 ? g = 200 : null;


 let f: number;
 if(GemEvnt) f = 5

    function getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
    // Example: Generate a random number between 1 and 10 (inclusive)
    let randomNum = getRandomInt(0, g!); // gems

    function getRandomInt1(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 0.75)) + min;
    }
    const randomNum2 = getRandomInt1(0, 1); // seeds

     function getRandomInt2(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomNum3 = getRandomInt2(0, 1); // block

    function xy(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Example: Generate a random number between 1 and 10 (inclusive)
    let randomNumxy = xy(32, 32.3); // gems

    function xy1(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Example: Generate a random number between 1 and 10 (inclusive)
    let randomNumxy1 = xy1(16, 16.3); // gems


   // peer.send(Variant.from("OnTalkBubble", peer.data.netID, `Collected \`2${randomNum} Gems!`))
//console.log(`x: ${peer.data.x}, y: ${peer.data.y}`)
//console.log(`[Punch] x: ${tankData.xPunch! + tankData.xPos!}, y: ${tankData.yPunch! + tankData.yPos!}`)

   // console.log(itemMeta.rarity)

  /* if (randomNum > 0 || randomNum2 > 0 || randomNum3 > 0) {
    if (itemMeta.rarity !== 999) {
      if (randomNum > 0) {
        world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, randomNum);
      }
  
      if (randomNum2 > 0) {
        world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), itemMeta.id! + 1, randomNum2);
      }
  
      if (randomNum3 > 0) {
        world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), itemMeta.id!, randomNum3);
      }
    }
  }*/

  


  //let gemStack = 0;

  

/*if (randomNum > 0 || randomNum2 > 0 || randomNum3 > 0) {
  if (itemMeta.rarity !== 999) {
    if (randomNum > 0) {
      world.dropGems(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, randomNum, { tree : false, noSimilar: false });
      if(GemEvnt){
        world.dropGems(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, randomNum * Gems);
      }
      //world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, 100);
      //world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, 100);
      ///world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, 100);
      //world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, 100);
    //  world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, 100);
     // world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, 100);
      gemStack += randomNum; // Add randomNum to the gemStack
     // world.collect(peer, randomNum)
    }
    

    if (randomNum2 > 0) {
      world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), itemMeta.id! + 1, randomNum2);
     // gemStack += randomNum2; // Add randomNum2 to the gemStack
     // world.collect(peer, randomNum2)
     //gemStack += 100;
    }

    if (randomNum3 > 0) {
      world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), itemMeta.id!, randomNum3);
    // gemStack += randomNum3; // Add randomNum3 to the gemStack
     // world.collect(peer, randomNum3)
    // gemStack += 100; 
    }
  }
}*/

/*if (randomNum > 0 || randomNum2 > 0 || randomNum3 > 0) {
  if (itemMeta.rarity !== 999) {
    let gemStack = randomNum;
    if(GemEvnt) gemStack = randomNum * Gems

    const gemQuantities = [100, 50, 10, 5, 1];

    for (const quantity of gemQuantities) {
      while (gemStack >= quantity) {
        if(randomNum <= 5){
          world.dropGems(peer, block.x! * randomNumxy + Math.floor(Math.random() * randomNumxy1), block.y! * randomNumxy + Math.floor(Math.random() * randomNumxy1), 112, quantity + randomNum, { tree: false, noSimilar: false });
        gemStack -= quantity;
        }
        if(randomNum <= 10){ 
          world.dropGems(peer, block.x! * randomNumxy + Math.floor(Math.random() * randomNumxy1), block.y! * randomNumxy + Math.floor(Math.random() * randomNumxy1), 112, quantity + randomNum, { tree: false, noSimilar: false });
        gemStack -= quantity;
        }
        if(randomNum <= 50){
          world.dropGems(peer, block.x! * randomNumxy + Math.floor(Math.random() * randomNumxy1), block.y! * randomNumxy + Math.floor(Math.random() * randomNumxy1), 112, quantity + randomNum, { tree: false, noSimilar: false });
        gemStack -= quantity;
        }
        if(randomNum <= 100 || randomNum >= 100){
          world.dropGems(peer, block.x! * randomNumxy + Math.floor(Math.random() * randomNumxy1), block.y! * randomNumxy + Math.floor(Math.random() * randomNumxy1), 112, quantity + randomNum, { tree: false, noSimilar: false });
        gemStack -= quantity;
        }
        if (GemEvnt) {
          world.dropGems(peer, block.x! * randomNumxy + Math.floor(Math.random() * randomNumxy1), block.y! * randomNumxy + Math.floor(Math.random() * randomNumxy1), 112, gemStack + quantity);
          gemStack = 0;
        }
      }
    }*/
  // Function to calculate a random position inside a 32x16 box
// Function to calculate a random position inside a 32x16 box
// Function to calculate a random position inside a 32x16 box
const getRandomPositionInsideBox = () => {
  const minX = block.x! * 32;
  const minY = block.y! * 32;

  const newX = minX + Math.floor(Math.random() * 32);
  const newY = minY + Math.floor(Math.random() * 16);

  return { newX, newY };
};

const getRandomPositionInsideRange = (block: Block, rangeX: number, rangeY: number) => {
  const minX = block.x! * 32;
  const minY = block.y! * 32;
  
  const newX = minX + Math.floor(Math.random() * rangeX);
  const newY = minY + Math.floor(Math.random() * rangeY);

  return { newX, newY };
};

if (randomNum > 0 || randomNum2 > 0 || randomNum3 > 0) {
  if (itemMeta.rarity !== 999) {
    let gemStack = randomNum;
    if(GemEvnt) gemStack = randomNum * Gems

    const gemQuantities = [100, 50, 10, 5, 1];

    for (const quantity of gemQuantities) {
      while (gemStack >= quantity) {
        const { newX, newY } = getRandomPositionInsideRange(block, 16, 16);

        

        world.dropGems(peer, newX, newY, 112, quantity, { tree: false, noSimilar: false });


        gemStack -= quantity;
      }
    }




  

  


      
    
    
      
    
    
    



    

    // Consolidate the code for dropping randomNum2 and randomNum3
    if (randomNum2 > 0) {
      world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), itemMeta.id! + 1, randomNum2);
      //gemStack = 0;
    }

    if (randomNum3 > 0) {
      world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), itemMeta.id!, randomNum3);
      //gemStack = 0;
    }
  }
}

/*if (randomNum > 0 || randomNum2 > 0 || randomNum3 > 0) {
  if (itemMeta.rarity !== 999) {
    let gemStack = randomNum;

    const gemQuantities = [100, 50, 10, 5, 1];

    for (const quantity of gemQuantities) {
      while (gemStack >= quantity) {
        world.dropGems(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, quantity, { tree: false, noSimilar: false });
        gemStack -= quantity;
      }
    }

    if (GemEvnt) {
      world.dropGems(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), 112, gemStack * Gems);
      gemStack = 0;
    }

    // Consolidate the code for dropping randomNum2 and randomNum3
    if (randomNum2 > 0) {
      world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), itemMeta.id! + 1, randomNum2);
    }

    if (randomNum3 > 0) {
      world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16), block.y! * 32 + Math.floor(Math.random() * 16), itemMeta.id!, randomNum3);
    }
  }
}*/

  

//console.log(`Total gems collected: ${gemStack}`);

  
    }

   



if(itemMeta.id === 758){

      let hasSpun = false;

      function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      // Example: Generate a random number between 1 and 10 (inclusive)
      const randomNum = getRandomInt(0, 36);

      //if(itemMeta.breakHits!) return randomNum;


      if(randomNum === 0 && hasSpun === false){
        peer.send(Variant.from({ delay: 2500 }, "OnTalkBubble", peer.data.netID, `[${peer.data.tankIDName} spun the wheel and got \`2${randomNum}\`0]!`))
      peer.send(Variant.from({ delay: 2500 }, "OnConsoleMessage", `[${peer.data.tankIDName} spun the wheel and got \`2${randomNum}\`0!]`))
      hasSpun = true
      }
      if(randomNum < 30){
        peer.send(Variant.from({ delay: 2500 }, "OnTalkBubble", peer.data.netID, `[${peer.data.tankIDName} spun the wheel and got \`4${randomNum}\`0]!`))
      peer.send(Variant.from({ delay: 2500 }, "OnConsoleMessage", `[${peer.data.tankIDName} spun the wheel and got \`4${randomNum}\`0!]`))
      hasSpun = true
      }else{
        peer.send(Variant.from({ delay: 2500 }, "OnTalkBubble", peer.data.netID, `[${peer.data.tankIDName} spun the wheel and got \`b${randomNum}\`0]!`))
      peer.send(Variant.from({ delay: 2500 }, "OnConsoleMessage", `[${peer.data.tankIDName} spun the wheel and got \`b${randomNum}\`0!]`))
      hasSpun = true
      }

      //if(hasSpun) return false;
    }
    
    

    

    

  if (!itemMeta.id) return;
  if (typeof block.damage !== "number" || block.resetStateAt! <= Date.now()) block.damage = 0;

  if (world.data.owner) {
    if (world.data.owner.id !== peer.data.id_user) {
      if (peer.data.role !== Role.DEVELOPER) {
        if (itemMeta.id === 242)
          peer.send(
            Variant.from(
              "OnTalkBubble",
              peer.data.netID,
              `\`#[\`0\`9World Locked by ${world.data.owner?.displayName}\`#]`
            )
          );

        return peer.everyPeer((p) => {
          if (p.data.world === peer.data.world && p.data.world !== "EXIT")
            p.send(
              Variant.from({ netID: peer.data.netID }, "OnPlayPositioned", "audio/punch_locked.wav")
            );
        });
      }
    }
  }

  const storedObject = await data.get(`PlayerLastJoined_${peer.data.id_user}`);


  if (storedObject && typeof storedObject === 'object' && 'user_id' in storedObject) {
    const { user_id, time } = storedObject as { user_id: string, time: number };
    
    // Ensure 'time' is a number before creating a Date object
    if (typeof time === 'number') {
      const timeAsDate = new Date(time);

      //const oneMonthFromNow = new Date();
    //oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
      // Rest of the code
      if (world.data.owner) {
        if (typeof world.data.owner.id === user_id) {
          // Add any additional conditions if needed
          if (itemMeta.id === 242 && timeAsDate.getTime() === oneDayAgo.getTime()) {
            peer.send(
              Variant.from(
                "OnTalkBubble",
                peer.data.netID,
                `\`4World Lock has been removed by ${peer.name} due to inactivity\`4\``
              )
            );
    
            peer.everyPeer((p) => {
              if (p.data.world === peer.data.world && p.data.world !== "EXIT") {
                p.send(
                  Variant.from({ netID: peer.data.netID }, "OnPlayPositioned", "audio/punch_locked.wav")
                );
              }
            });
          }
        }
      }
    } else {
      console.log('Invalid time data found for this key.');
    }
  } else {
    console.log('No data found for this key.');
  }
  

  

  if (itemMeta.id === 8 || itemMeta.id === 6 || itemMeta.id === 3760 || itemMeta.id === 7372) {
    if (peer.data.role !== Role.DEVELOPER && peer.data.role !== Role.ADMIN && peer.data.role !== Role.MOD) {
      peer.send(Variant.from("OnTalkBubble", peer.data.netID, "It's too strong to break."));
      peer.everyPeer((p) => {
        if (p.data.world === peer.data.world && p.data.world !== "EXIT")
          p.send(
            Variant.from({ netID: peer.data.netID }, "OnPlayPositioned", "audio/punch_locked.wav")
          );
      });
      return;
    }
  }

  if (block.damage >= itemMeta.breakHits!) {
    block.damage = 0;
    block.resetStateAt = 0;

    if (block.fg) block.fg = 0;
    else if (block.bg) block.bg = 0;

    tankData.type = TankTypes.TILE_PUNCH;
    tankData.info = 18;

    block.rotatedLeft = undefined;

    switch (itemMeta.type) {
      case ActionTypes.PORTAL:
      case ActionTypes.DOOR:
      case ActionTypes.MAIN_DOOR: {
        block.door = undefined;
        break;
      }

      case ActionTypes.SIGN: {
        block.sign = undefined;
        break;
      }

      case ActionTypes.DEADLY_BLOCK: {
        block.dblockID = undefined;
        break;
      }

      case ActionTypes.HEART_MONITOR: {
        block.heartMonitor = undefined;
        break;
      }

      case ActionTypes.LOCK: {
        // Fix dc sendiri bila menghancurkan wl
        if (itemMeta.id !== 242) return;

        block.worldLock = undefined;
        block.lock = undefined;
        world.data.owner = undefined;

        tileUpdate(base, peer, itemMeta.type, block, world);
        break;
      }
    }
  } else {
    tankData.type = TankTypes.TILE_DAMAGE;
    tankData.info = block.damage + 5;

    block.resetStateAt = Date.now() + itemMeta.resetStateAfter! * 1000;
    block.damage++;

    switch (itemMeta.type) {
      case ActionTypes.SEED: {
        /** */
        function getRandomInt6(min: number, max: number): number {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }
        const randomNum6 = getRandomInt6(0, 1);

        interface NumberProbability {
          number: number;
          weight: number;
        }
        
        function getRandomInt(numbers: NumberProbability[]): number {
          const totalWeight = numbers.reduce((sum, { weight }) => sum + weight, 0);
        
          let randomNumber: number;
        
          const randomWeight = Math.floor(Math.random() * totalWeight);
        
          let cumulativeWeight = 0;
          for (const { number, weight } of numbers) {
            cumulativeWeight += weight;
            if (randomWeight < cumulativeWeight) {
              randomNumber = number;
              break;
            }
          }
        
          return randomNumber!;
        }

        const numbers: NumberProbability[] = [
          { number: 1058, weight: 10 },
          { number: 1094, weight: 10 },
          { number: 1096, weight: 10 },
          { number: 1098, weight: 10 },
          { number: 1828, weight: 2 },
        ];
      
        const randomNum = getRandomInt(numbers);


        

        if (block.tree && Date.now() >= block.tree.fullyGrownAt && gameEvents.Harvestfest === "true") {
        world.drop(peer, block.x! * 32 + Math.floor(Math.random() * 16),
        block.y! * 32 + Math.floor(Math.random() * 16), randomNum, 1)
        }

        world.harvest(peer, block);
      }
    }
  }

  peer.send(tank);

  world.saveToCache();

  peer.everyPeer((p) => {
    if (
      p.data.netID !== peer.data.netID &&
      p.data.world === peer.data.world &&
      p.data.world !== "EXIT"
    ) {
      p.send(tank);
    }
  });
  return;
}
