import { Events } from "discord.js";

module.exports = {
  name: Events.MessageCreate,
  //   once: true,
  once: false,
  execute(message) {
    console.log(message.content);
    if (!message.content) return;
    if (message.content === "토끼야") {
      message.reply("error 찾느라 바쁘니까, 조용히 해줄래?");

      message.channel.send("아 퇴사하고 싶다.");
    }
  },
};
