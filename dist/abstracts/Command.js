"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor() {
        this.opt = {
            name: "",
            description: "",
            cooldown: 1,
            ratelimit: 1,
            category: "",
            usage: "",
            example: [],
            permission: []
        };
    }
    async execute(base, peer, text, args) { }
}
exports.Command = Command;
