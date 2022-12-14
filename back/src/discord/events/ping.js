"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.MessageCreate,
    //   once: true,
    once: false,
    execute: function (message) {
        console.log(message.content);
        if (!message.content)
            return;
        if (message.content === "토끼야") {
            message.reply("error 찾느라 바쁘니까, 조용히 해줄래?");
            message.channel.send("아 퇴사하고 싶다.");
        }
    },
};
