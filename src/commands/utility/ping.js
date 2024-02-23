const { bold } = require("colorette"); // Importing the 'bold' function from the 'colorette' package
const Discord = require("discord.js"); // Importing the 'discord.js' library

module.exports = {
  name: "ping",
  aliases: ["p"],
}

module.exports.run = async (client, message, args) => {
  // Make embed show "pinging..."
  const pinging = new Discord.EmbedBuilder()
    .setTitle("Ping Command:")
    .setDescription(`Awaiting Pinging...`);

  // Send pinging to channel
  const msg = await message.channel.send({ embeds: [pinging] });

  // Get latency inside of an embed
  const pingEmbed = new Discord.EmbedBuilder().setTitle(
    "Ping Command:"
  ).setDescription;
  if (client.readyAt) {
    const pingEmbed = new Discord.EmbedBuilder()
      .setTitle("Ping Command:")
      .setDescription(
        `> 🏓 Bot Latency: **${
          Date.now() - message.createdTimestamp
        }ms**\n\n> 🏓 API Latency: **${Math.round(client.ws.ping)}ms**`
      );

    msg.edit({ embeds: [pingEmbed] }).catch(console.error);
  } else {
    console.log("Bot is not ready yet. Waiting for the ready event...");
  }
};
