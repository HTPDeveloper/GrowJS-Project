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
      /*
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
      */
     .raw("set_description_text|Welcome to the `2Growtopia Store``! Select the item you'd like more info on.`o `wWant to get `5Supporter`` status? Any Gem purchase (or `526000`` Gems earned with free `5Tapjoy`` offers) will make you one. You'll get new skin colors, the `5Recycle`` tool to convert unwanted items into Gems, and more bonuses!")
     .addSpacer("small")
    .raw("enable_tabs|1")
    .addSpacer("small")
    .raw("add_tab_button|main_menu|Home|interface/large/btn_shop2.rttex||1|0|0|0||||-1|-1|||0|0|")
    .addSpacer("small")
    .raw("add_tab_button|locks_menu|Locks And Stuff|interface/large/btn_shop2.rttex||0|1|0|0||||-1|-1|||0|0|")
    .addSpacer("small")
    .raw("add_tab_button|itempack_menu|Item Packs|interface/large/btn_shop2.rttex||0|3|0|0||||-1|-1|||0|0|")
.raw("add_tab_button|bigitems_menu|Awesome Items|interface/large/btn_shop2.rttex||0|4|0|0||||-1|-1|||0|0|")
.addSpacer("small")
.raw("add_tab_button|weather_menu|Weather Machines|interface/large/btn_shop2.rttex|Tired of the same sunny sky?  We offer alternatives within...|0|5|0|0||||-1|-1|||0|0|")
.addSpacer("small")
.raw("add_tab_button|token_menu|Growtoken Items|interface/large/btn_shop2.rttex||0|2|0|0||||-1|-1|||0|0|")
.addSpacer("small")
.raw("add_banner|interface/large/gui_shop_featured_header.rttex|0|1|") // interface/large/gui_wrench_goals_quests.rttexex", { width: 404, height: 324 })
//.addCustomButton("test1", "interface/large/gui_wrench_goals_quests.rttex", { width: 404, height: 324 })
.addSpacer("small")
.raw("add_image_button|image_button|interface/large/gui_halloween_banner3.rttex|bannerlayout|OPENDIALOG|halloweenquestpopup|")
.addSpacer("small")
.raw("add_button|halloween_dummy|`oGo To Growganoth!``|interface/large/store_buttons/store_buttons41.rttex|OPENDIALOG&warp_player_into_halloween_world|1|1|0|0|||-1|-1||-1|-1||1||||||0|0|")
.addSpacer("small")
.raw("add_button|growganoth|`oGift of Growganoth Pack``|interface/large/store_buttons/store_buttons7.rttex|`2You Get:`` 10 Gifts of Growganoth.<CR><CR>`5Description:`` `4Available only during Halloween!`` Would you like to donate to the cause?  Give Growganoth a few gems, and it will reward you with vast power beyond imagining!  Or, perhaps, a box containing a random Halloween item.  Opening each is equivalent to feeding 1 item of rarity 75 into the Maw of Growganoth.  What you will get is random, so don't buy this unless you're ready to be surprised! Each gift has the chance of getting `#Dark King's Offering`` or any of it's Components, including the `#Rare Spooky Gift``! Only available for purchase during `2Halloween Week.`` This item is `#Untradeable.``|0|1|15000|0|||-1|-1||-1|-1||1||||||0|0|")
.addSpacer("small")//.addCustomButton("test1", "interface/large/gui_wrench_goals_quests.rttex", { width: 404, height: 324 })
.raw("add_button|mega_sigil|`oElder Sigil Pack``|interface/large/store_buttons/store_buttons41.rttex|`2You Get:`` 5 Elder Sigils.<CR><CR>`5Description:`` This mystical item will teleport you directly into the gaping maw of Growganoth as many times you want for a short period. You must be in the GROWGANOTH world in order to use this item!|2|1|10000|0|||-1|-1||-1|-1||1||||||0|0|")
.addSpacer("small")//.addCustomButton("test1", "interface/large/gui_wrench_goals_quests.rttex", { width: 404, height: 324 })
.raw("add_button|dark_ticket|`oDark Ticket``|interface/large/store_buttons/store_buttons27.rttex|`2You Get:`` 1 Dark Ticket.<CR><CR>`5Description:`` Enter the Tomb of Growganoth at your own peril! Find the `5Sacrificial Wells`` to earn `5Corrupted Souls`` and locate the `5Corruption Altar`` to get rewards... beware of the darkness!|0|6|6000|0|||-1|-1||-1|-1||1||||||0|0|")
.addSpacer("small")
.raw("add_button|riding_raven|`oRiding Raven``|interface/large/store_buttons/store_buttons16.rttex|`2You Get:`` 1 Riding Raven.<CR><CR>`5Description:`` Only the darkest magic could breed a raven so massive that you could ride on it. And Growganoth only permits such magic during `2Halloween Week``, so buy this now before Halloween is over! Riding on this bird gives you the ability to double-jump. Only available for purchase during `2Halloween Week``!|0|1|150000|0|||-1|-1||-1|-1||1||||||0|0|")
.addSpacer("small")
.raw("add_button|dark_mountains|`oDark Mountains``|interface/large/store_buttons/store_buttons39.rttex|`2You Get:`` 1 Weather Machine - Dark Mountains.<CR><CR>`5Description:`` Bring some terror to your world with these mountains!|2|3|50000|0|||-1|-1|interface/large/gui_shop_buybanner2.rttex|0|7||1||||||0|0|")
.addSpacer("small")
.raw("add_button|spirit_hat|`oSpiritual Resonator``|interface/large/store_buttons/store_buttons7.rttex|`2You Get:`` 1 Spiritual Resonator.<CR><CR>`5Description:`` `4Available only during Halloween!`` This fantabulous contraption is worn on the head, where it sends out signals into the great beyond, attracting friendly spirits.  The ghost that follows you around when you wear this has a special ability - if you wear a pet leash on your wrist at the same time, the ghost will replace the pet, but imitate its abilities (such as breathing fire if you wear a Dragon Hand).|0|0|40000|0|||-1|-1||-1|-1||1||||||0|0|")
.addSpacer("small")
.raw("add_button|anzu_pack1|`oAdvertisers Pack``|interface/large/store_buttons/store_buttons36.rttex|`2You Get:`` 1 Ad Control Block and a selection of Ad blocks. <CR><CR>`5Description:`` With this pack you can build custom Ad billboards in your world. There are 3 sizes you can choose from, 2x3, 3x2 and 6x1. You need to arrange these in a grid to activate the Ad. Remember to check your Gem earnings each day using the Ad Control Block.|0|1|10000|0|||-1|-1||-1|-1||1||||||0|0|")
.addSpacer("small")
.raw("add_banner|interface/large/gui_shop_featured_header.rttex|0|2|")
.addSpacer("small")
.raw("add_big_banner|interface/large/gui_store_iap_message.rttex|0|0|`0You want to buy gems?! Great! But you'll need to add a `2GrowID`` to this account first, to make sure you won't lose what you buy if you drop your device in the toilet. It's free!|")
.addSpacer("small")
.raw("add_banner|interface/large/gui_shop_featured_header.rttex|0|3|")
.addSpacer("small")
.raw("add_big_banner|interface/large/gui_store_iap_message.rttex|0|1|`0You want to buy gems?! Great! But you'll need to add a `2GrowID`` to this account first, to make sure you won't lose what you buy if you drop your device in the toilet. It's free!|")
.addSpacer("small")
.raw("add_image_button|image_button|interface/large/gui_shop_grow_pass.rttex|bannerlayout|OPENDIALOG|battlepasspopup|")
.addSpacer("small")
.raw("add_button|redeem_code|Redeem Code|interface/large/store_buttons/store_buttons40.rttex|OPENDIALOG&showredeemcodewindow|1|5|0|0|||-1|-1||-1|-1||1||||||0|0|")
.addSpacer("small")
      //.endDialog("drop_end", "Cancel", "OK")
      // add_item\\362\\20\\0\\20\\1\\Angel Wings\\player_back.rttex\\411810451\\4\\-1\\0\\1\\1\\0\\1\\0\\0\\6\\999\\200\\
      .addQuickExit()
      .str();

    peer.send(Variant.from("OnStoreRequest", dialog));
  }
}
