"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServer = void 0;
const express_1 = __importDefault(require("express"));
const node_fs_1 = require("node:fs");
const node_http_1 = __importDefault(require("node:http"));
const node_https_1 = __importDefault(require("node:https"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const node_path_1 = __importDefault(require("node:path"));
const app = (0, express_1.default)();
const options = {
    key: (0, node_fs_1.readFileSync)("./assets/ssl/server.key"),
    cert: (0, node_fs_1.readFileSync)("./assets/ssl/server.crt")
};
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10800000,
    max: 5,
    message: "Too many accounts created from this IP, please try again after 3 hour",
    standardHeaders: true,
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
function WebServer(log, db) {
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.set("view engine", "ejs");
    app.set("views", node_path_1.default.join(__dirname, "../../web/views"));
    app.use("/growtopia/server_data.php", (req, res) => {
        res.send(`server|${process.env.WEB_ADDRESS}\nport|17091\ntype|1\n#maint|Maintenance woi\nmeta|lolwhat\nRTENDMARKERBS1001`);
    });
    app.get("/register", (req, res) => {
        res.render("register.ejs");
    });
    app.post("/api/register", apiLimiter, async (req, res) => {
        if (req.body && req.body.username && req.body.password) {
            let result = await db.createUser(req.body.username, req.body.password);
            if (result)
                res.send("OK, Successfully creating account");
            else
                res.send("Error");
        }
    });
    if (process.env.WEB_ENV === "production") {
        app.listen(3000, () => {
            log.ready(`Starting development web server on: http://${process.env.WEB_ADDRESS}:3000`);
            log.info(`To register account you need to register at: http://${process.env.WEB_ADDRESS}:3000/register`);
        });
    }
    else if (process.env.WEB_ENV === "development") {
        let httpServer = node_http_1.default.createServer(app);
        let httpsServer = node_https_1.default.createServer(options, app);
        httpServer.listen(80);
        httpsServer.listen(443);
        httpsServer.on("listening", function () {
            log.ready(`Starting web server on: http://${process.env.WEB_ADDRESS}:80`);
            log.info(`To register account you need to register at: http://${process.env.WEB_ADDRESS}:80/register`);
        });
    }
}
exports.WebServer = WebServer;
