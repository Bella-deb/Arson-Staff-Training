const { bold } = require("colorette"); // Importing the 'bold' function from the 'colorette' package
const Discord = require("discord.js"); // Importing the 'discord.js' library

exports.run = async (client, message, args) => {
  // Make embed show "pinging..."
  const pinging = new Discord.EmbedBuilder()
    .setTitle("Ping Command:")
    .setDescription(`Awaiting Pinging...`);

  const msg = await message.channel.send({ embeds: [pinging] });

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

  console.log(
    `${bold("Ping Command Used:")}\nUser: ${message.author.tag}\nUser ID: ${
      message.author.id
    }`
  );
};

exports.name = "ping";
exports.aliases = ["p"]; // Add the alias "p" to the command
