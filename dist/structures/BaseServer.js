"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _BaseServer_instances, _BaseServer__loadEvents, _BaseServer__loadItems, _BaseServer__loadActions, _BaseServer__loadDialogs, _BaseServer__loadCommands;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServer = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const growtopia_js_1 = require("growtopia.js");
const Webserver_1 = require("./Webserver");
const Utils_1 = require("../utils/Utils");
const itemsdat_1 = require("itemsdat");
const Logger_1 = require("./Logger");
const db_1 = require("../database/db");
const Collection_1 = require("./Collection");
class BaseServer {
    constructor() {
        _BaseServer_instances.add(this);
        this.server = new growtopia_js_1.Client({ https: { enable: false } });
        this.items = {
            hash: `${(0, Utils_1.hashItemsDat)(node_fs_1.default.readFileSync("./assets/dat/items.dat"))}`,
            content: node_fs_1.default.readFileSync("./assets/dat/items.dat"),
            metadata: {}
        };
        this.action = new Map();
        this.cache = {
            users: new Collection_1.Collection(this),
            worlds: new Collection_1.Collection(this)
        };
        this.log = new Logger_1.Logger();
        this.commands = new Map();
        this.cooldown = new Map();
        this.dialogs = new Map();
        this.database = new db_1.Database();
    }
    start() {
        __classPrivateFieldGet(this, _BaseServer_instances, "m", _BaseServer__loadItems).call(this).then(() => {
            this.log.ready("Items data ready!");
            __classPrivateFieldGet(this, _BaseServer_instances, "m", _BaseServer__loadEvents).call(this);
            __classPrivateFieldGet(this, _BaseServer_instances, "m", _BaseServer__loadActions).call(this);
            __classPrivateFieldGet(this, _BaseServer_instances, "m", _BaseServer__loadCommands).call(this);
            __classPrivateFieldGet(this, _BaseServer_instances, "m", _BaseServer__loadDialogs).call(this);
            this.server.listen();
            (0, Webserver_1.WebServer)(this.log, this.database);
        });
    }
}
exports.BaseServer = BaseServer;
_BaseServer_instances = new WeakSet(), _BaseServer__loadEvents = function _BaseServer__loadEvents() {
    node_fs_1.default.readdirSync(`${__dirname}/../events`).forEach(async (event) => {
        var _a;
        let file = (await (_a = `../events/${event}`, Promise.resolve().then(() => __importStar(require(_a))))).default;
        let initFile = new file();
        this.server.on(initFile.name, (...args) => initFile.run(this, ...args));
        this.log.event(`Loaded "${initFile.name}" events`);
    });
}, _BaseServer__loadItems = async function _BaseServer__loadItems() {
    let items = await new itemsdat_1.ItemsDat(node_fs_1.default.readFileSync("./assets/dat/items.dat")).decode();
    // 1181890091
    // let tes = items.items.find((v) => v.id === 10000)!;
    // console.log(tes);
    // tes.extraFile = "interface/large/news_banner1.rttex";
    // tes.extraFileHash = 1181890091;
    // console.log(tes);
    // const encoded = await new ItemsDat().encode(items);
    // let newItems = await new ItemsDat(encoded).decode();
    // this.items.content = encoded;
    // this.items.hash = `${hashItemsDat(encoded)}`;
    // this.items.metadata = newItems;
    this.items.metadata = items;
}, _BaseServer__loadActions = function _BaseServer__loadActions() {
    node_fs_1.default.readdirSync(`${__dirname}/../actions`).forEach(async (event) => {
        var _a;
        let file = (await (_a = `../actions/${event}`, Promise.resolve().then(() => __importStar(require(_a))))).default;
        let initFile = new file();
        this.action.set(initFile.config.eventName, initFile);
        this.log.action(`Loaded "${initFile.config.eventName}" actions`);
    });
}, _BaseServer__loadDialogs = function _BaseServer__loadDialogs() {
    node_fs_1.default.readdirSync(`${__dirname}/../dialogs`).forEach(async (event) => {
        var _a;
        let file = (await (_a = `../dialogs/${event}`, Promise.resolve().then(() => __importStar(require(_a))))).default;
        let initFile = new file();
        this.dialogs.set(initFile.config.dialogName, initFile);
        this.log.dialog(`Loaded "${initFile.config.dialogName}" dialogs`);
    });
}, _BaseServer__loadCommands = function _BaseServer__loadCommands() {
    node_fs_1.default.readdirSync(`${__dirname}/../commands`).forEach(async (fileName) => {
        var _a;
        let file = (await (_a = `../commands/${fileName}`, Promise.resolve().then(() => __importStar(require(_a))))).default;
        let initFile = new file();
        this.commands.set(initFile.opt.name, initFile);
        this.log.command(`Loaded "${initFile.opt.name}" command`);
    });
};
