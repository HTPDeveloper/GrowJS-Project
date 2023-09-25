import { Variant } from "growtopia.js";
import { Command } from "../abstracts/Command";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { CommandOptions } from "../types/command";
import { Role } from "../utils/Constants";
import { find } from "../utils/Utils";
import { DialogBuilder } from "../utils/builders/DialogBuilder";

export default class extends Command {
  public opt: CommandOptions;

  constructor() {
    super();
    this.opt = {
      name: "punishview",
      description: "Ban/Mute/Warn user",
      cooldown: 5,
      ratelimit: 5,
      category: "Developer",
      usage: "/punishview <who>",
      example: ["/givegems 100", "/givegems 100 JadlionHD"],
      permission: [Role.DEVELOPER]
    };
  }

  public async execute(base: BaseServer, peer: Peer, text: string, args: string[]): Promise<void> {
    if(!args[0]) return;

    const targetPeer = find(base, base.cache.users, (user) =>
        user.data.tankIDName.toLowerCase().includes(args[0].toLowerCase())
    );

    if(!targetPeer)
    return peer.send(Variant.from("OnConsoleMessage", `Make sure that player is online.`));

    let p;

    if(targetPeer.data.role === "1") p = "Developer"
    if(targetPeer.data.role === "2") p = "Basic"
    if(targetPeer.data.role === "3") p = "Supporter"

    let dialog = new DialogBuilder()
    .defaultColor()
    .addLabelWithIcon("Editing " + targetPeer.name + ` #${targetPeer.data.id_user}`, "32", "small")
    .addSpacer("small")
    .addSmallText("`bAccount information:")
    .addSmallText(`[!] Raw name: ${targetPeer.data.tankIDName}`)
    .addSmallText(`[!] UserID: #${targetPeer.data.id_user}`)
    .addSmallText(`[!] NetID: ${targetPeer.data.netID}`)
    .addSmallText(`[!] Country: ${targetPeer.data.country}`)
    .addSmallText(`[!] Gems: ${targetPeer.data.gems}`)
    .addSmallText(`[!] Role: ${p}`)
    .addSmallText(`[!] Current world: ${targetPeer.data.world}`)
    .addSpacer("big")
    .addCustomBreak()
    .addButtonWithIcon("ban_users", "732", "    Ban    ")
    .addButtonWithIcon("curse_user", "278", "   Curse  ")
    .addButtonWithIcon("mute_user", "408", "Duct tape")
    .addButtonWithIcon("warn_user", "1432", " Warn user")
    .addCustomBreak()
    .addSpacer("small")
    .addInputBox("time", "Time:", "In minutes.", 15)
    .addInputBox("reason", "Reason:", "", 25)
    .addSpacer("small")
    .addSmallText("`4(This is only for warning user, DO NOT ABUSE!)")
    .addInputBox("warning", "Warning:", "", 30)
    .addSpacer("small")
    .endDialog("ban_user", "Cancel", "Ok")
    .str()

    peer.send(Variant.from("OnDialogRequest", dialog));
  }
}
