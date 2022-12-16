"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordForWinston = void 0;
var Discord = require("discord.js");
var client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
require("dotenv/config");
require("dotenv").config();
var fs = require("node:fs");
var path = require("node:path");
var CLIENT_ID = process.env.CLIENT_ID;
var TOKEN = process.env.DISCORD_TOKEN;
var GUILD_ID = process.env.GUILD_ID;
var CHANNEL_ID = process.env.CHANNEL_ID;
function discordForWinston(error, req) {
    return __awaiter(this, void 0, void 0, function () {
        var time, status, message, method, originalUrl, requestClientIp, requestStartTime, discordLogger, channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!error)
                        return [2 /*return*/];
                    time = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                    status = error.status || 400;
                    message = error.message;
                    method = req.method;
                    originalUrl = req.originalUrl;
                    requestClientIp = req.body.requestClientIp;
                    requestStartTime = req.body.requestStartTime;
                    discordLogger = "\n  ```\n  [ERROR] \n      STATUS:       ".concat(status, "\n      METHOD:       ").concat(method, "\n      URL:          ").concat(originalUrl, "\n      MESSAGE:      ").concat(message, "\n      ERROR_TIME:   ").concat(time, "\n      REQUEST_TIME: ").concat(requestStartTime, "\n      CLIENT_IP:    ").concat(requestClientIp, "\n  ``` \n  ");
                    return [4 /*yield*/, client.channels.fetch(CHANNEL_ID)];
                case 1:
                    channel = _a.sent();
                    if (status > 500) {
                        return [2 /*return*/, channel.send(discordLogger)];
                    }
                    return [2 /*return*/, channel.send(discordLogger)];
            }
        });
    });
}
exports.discordForWinston = discordForWinston;
client.login(TOKEN);
var eventsPath = path.join(__dirname, "events");
var eventFiles = fs
    .readdirSync(eventsPath)
    .filter(function (file) { return file.endsWith(".js"); });
var _loop_1 = function (file) {
    var filePath = path.join(eventsPath, file);
    var event_1 = require(filePath);
    if (event_1.once) {
        client.once(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, args);
        });
    }
    else {
        client.on(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, args);
        });
    }
};
for (var _i = 0, eventFiles_1 = eventFiles; _i < eventFiles_1.length; _i++) {
    var file = eventFiles_1[_i];
    _loop_1(file);
}
