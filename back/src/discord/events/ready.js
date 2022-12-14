"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute: function (client) {
        console.log("Ready! Logged in as ".concat(client.user.tag));
    },
};
