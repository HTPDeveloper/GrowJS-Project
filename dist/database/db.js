"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const knex_1 = __importDefault(require("knex"));
const Utils_1 = require("../utils/Utils");
class Database {
    constructor() {
        this.knex = (0, knex_1.default)({
            client: "better-sqlite3",
            connection: {
                filename: "./data/dev.db"
            },
            log: {
                error(m) {
                    console.log(m);
                }
            },
            useNullAsDefault: true
        });
    }
    async getUser(username) {
        let res = await this.knex.select("*").from("users").where({ name: username });
        if (res.length)
            return res[0];
        else
            return undefined;
    }
    async saveUser(data) {
        if (!data.id_user)
            return;
        let res = await this.knex("users")
            .where({ id_user: data.id_user })
            .update({
            inventory: Buffer.from(JSON.stringify(data.inventory)),
            clothing: Buffer.from(JSON.stringify(data.clothing)),
            gems: data.gems
        }, []);
        if (res.length)
            return true;
        else
            return undefined;
    }
    async createUser(username, password) {
        const encPass = (0, Utils_1.encrypt)(password);
        let res = await this.knex("users").insert({ name: username, password: encPass, role: "1" });
        if (res.length)
            return res[0];
        else
            return undefined;
    }
    async getWorld(name) {
        let res = await this.knex.select("*").from("worlds").where({ name });
        if (res.length) {
            // Parse buffer to json
            res[0].dropped = res[0].dropped
                ? JSON.parse(res[0].dropped.toString())
                : { uid: 0, items: [] };
            return res[0];
        }
        else
            return undefined;
    }
    async saveWorld({ name, ownedBy = null, blockCount, blocks, width, height, owner, dropped, }) {
        if (!name && !blockCount && !blocks && !width && !height)
            return;
        let res = await this.knex("worlds").insert({
            name: name,
            ownedBy: ownedBy ? ownedBy : null,
            blockCount,
            width,
            height,
            blocks,
            owner,
            dropped
        });
        if (res.length)
            return true;
        else
            return undefined;
    }
    async updateWorld({ name, ownedBy = null, blockCount, blocks, width, height, owner, dropped }) {
        if (!name && !blockCount && !blocks && !width && !height)
            return;
        let res = await this.knex("worlds")
            .where({ name })
            .update({
            ownedBy: ownedBy ? ownedBy : null,
            blockCount,
            width,
            height,
            blocks,
            owner,
            dropped,
        }, []);
        if (res.length)
            return res[0];
        else
            return undefined;
    }
}
exports.Database = Database;
