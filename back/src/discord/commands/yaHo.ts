import Discord from "discord.js";

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("야")
    .setDescription("Replies with 호!"),
  async execute(interaction) {
    await interaction.reply("호");
  },
};
