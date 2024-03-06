const { bold } = require("colorette"); // Importing the 'bold' function from the 'colorette' package
const Discord = require("discord.js"); // Importing the 'discord.js' library
const config = require("../../config.json");

module.exports = {
  name: "ping",
  aliases: ["p"],
};

module.exports.run = async (client, message, args) => {
  try {
  // Make embed show "pinging..."
  const pinging = new Discord.EmbedBuilder()
    .setTitle("Ping Command:")
    .setColor("Random")
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
      .setColor(`${config.embedColor}`)
      .setDescription(
        `> 🏓 Bot Latency: **${
          Date.now() - message.createdTimestamp
        }ms**\n\n> 🏓 API Latency: **${Math.round(client.ws.ping)}ms**`
      );

    msg.edit({ embeds: [pingEmbed] }).catch(console.error);
  } else {
    console.log("Bot is not ready yet. Waiting for the ready event...");
  }
} catch (error) {
  if (error.code === "ETIMEDOUT") {
    // Check for timeout error code
    console.log("Timeout error occurred:", error.message);
    message.channel.send(`The command timed out. Please try again later.`);
  } else {
    console.log("An error occurred:", error);
    message.channel.send(`An error occurred!`);
  }
}
};
