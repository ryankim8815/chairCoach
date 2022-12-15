const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");
import "dotenv/config";
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const CLIENT_ID: string = process.env.CLIENT_ID;
const TOKEN: string = process.env.DISCORD_TOKEN;
const GUILD_ID: string = process.env.GUILD_ID;
const CHANNEL_ID: string = process.env.CHANNEL_ID;

export async function discordForWinston(error, req) {
  if (!error) return;
  const time = moment().format("YYYY-MM-DD HH:mm:ss");
  const status = error.status || 400;
  const message = error.message;
  const originalUrl = req.originalUrl;
  const requestClientIp = req.body.requestClientIp;
  const requestStartTime = req.body.requestStartTime;
  const discordLogger = `
  \`\`\`
  [ERROR] 
      STATUS:       ${status}
      URL:          ${originalUrl}
      MESSAGE:      ${message}
      ERROR_TIME:   ${time}
      REQUEST_TIME: ${requestStartTime}
      CLIENT_IP:    ${requestClientIp}
  \`\`\` 
  `;
  const channel = await client.channels.fetch(CHANNEL_ID);
  if (status > 500) {
    return channel.send(discordLogger);
  }
  return channel.send(discordLogger);
}

client.login(TOKEN);

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
