"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    constructor() { }
    get time() {
        return new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    }
    info(...content) {
        console.log(`[${this.time} - INFO    ]`, ...content);
    }
    ready(...content) {
        console.log(`[${this.time} - ${chalk_1.default.greenBright("READY")}   ]`, ...content);
    }
    event(...content) {
        console.log(`[${this.time} - ${chalk_1.default.blueBright("EVENT")}   ]`, ...content);
    }
    update(...content) {
        console.log(`[${this.time} - ${chalk_1.default.cyan("UPDATE")}  ]`, ...content);
    }
    action(...content) {
        console.log(`[${this.time} - ${chalk_1.default.rgb(242, 124, 27)("ACTION")}  ]`, ...content);
    }
    dialog(...content) {
        console.log(`[${this.time} - ${chalk_1.default.rgb(69, 214, 200)("DIALOG")}  ]`, ...content);
    }
    command(...content) {
        console.log(`[${this.time} - ${chalk_1.default.rgb(95, 232, 150)("COMMAND")} ]`, ...content);
    }
    debug(...content) {
        console.log(`[${this.time} - ${chalk_1.default.rgb(211, 237, 64)("DEBUG")}   ]`, ...content);
    }
    warn(...content) {
        console.log(`[${this.time} - ${chalk_1.default.rgb(255, 168, 18)("WARN")}    ]`, ...content);
    }
    error(...content) {
        console.log(`[${this.time} - ${chalk_1.default.rgb(230, 68, 28)("ERROR")}   ]`, ...content);
    }
}
exports.Logger = Logger;
